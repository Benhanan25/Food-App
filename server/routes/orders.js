const express = require("express");
const Order = require("../models/Order");
const { auth, role } = require("../middleware");

const router = express.Router();

router.post(
    "/",
    auth,
    role("customer"),
    async (req, res) => {
        try {
            const {
                restaurant,
                items,
                address,
                phone,
                subtotal,
                deliveryFee,
                total,
                paymentMethod
            } = req.body;

            if (
                !restaurant ||
                !items ||
                !items.length ||
                !address
            ) {
                return res.status(400).json({
                    message:
                        "Restaurant, items and address are required."
                });
            }

            const order = await Order.create({
                customer: req.user.id,
                restaurant,
                items,
                address,
                phone,
                subtotal,
                deliveryFee,
                total,
                paymentMethod: paymentMethod || "COD"
            });

            res.status(201).json(order);

        } catch (error) {
            console.error(
                "Create order error:",
                error.message
            );

            res.status(500).json({
                message: error.message
            });
        }
    }
);

router.get(
    "/my",
    auth,
    role("customer"),
    async (req, res) => {
        try {
            const orders = await Order.find({
                customer: req.user.id
            })
                .populate("restaurant")
                .populate("rider")
                .sort({
                    createdAt: -1
                });

            res.json(orders);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

router.get(
    "/restaurant",
    auth,
    role("restaurant", "admin"),
    async (req, res) => {
        try {
            const orders = await Order.find({})
                .populate("customer")
                .populate("restaurant")
                .populate("rider")
                .sort({
                    createdAt: -1
                });

            res.json(orders);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

router.get(
    "/rider",
    auth,
    role("rider", "admin"),
    async (req, res) => {
        try {
            const orders = await Order.find({
                $or: [
                    {
                        rider: req.user.id
                    },
                    {
                        status: "READY"
                    }
                ]
            })
                .populate("restaurant")
                .populate("customer")
                .sort({
                    createdAt: -1
                });

            res.json(orders);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

router.patch(
    "/:id/status",
    auth,
    async (req, res) => {
        try {
            const allowedStatuses = [
                "ACCEPTED",
                "PREPARING",
                "READY",
                "PICKED_UP",
                "ON_THE_WAY",
                "DELIVERED",
                "CANCELLED"
            ];

            const status = req.body.status;

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message:
                        "Invalid order status."
                });
            }

            const order =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    {
                        status
                    },
                    {
                        new: true
                    }
                );

            if (!order) {
                return res.status(404).json({
                    message:
                        "Order not found."
                });
            }

            res.json(order);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

router.patch(
    "/:id/assign",
    auth,
    role("admin", "restaurant"),
    async (req, res) => {
        try {
            const {
                riderId
            } = req.body;

            if (!riderId) {
                return res.status(400).json({
                    message:
                        "Rider ID is required."
                });
            }

            const order =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    {
                        rider: riderId
                    },
                    {
                        new: true
                    }
                )
                    .populate("rider")
                    .populate("restaurant")
                    .populate("customer");

            if (!order) {
                return res.status(404).json({
                    message:
                        "Order not found."
                });
            }

            res.json(order);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

module.exports = router;