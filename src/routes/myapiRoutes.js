const express = require("express");
const router = express.Router();
const myapiController = require("../controllers/myapiController");

/**
 * @swagger
 * tags:
 *   name: Birds
 *   description: Операции с данными о наблюдении птиц
 */

/**
 * @swagger
 * /birds:
 *   get:
 *     summary: Получить данные о птицах
 *     tags:
 *       - Birds
 *     parameters:
 *       - name: regionCode
 *         example: KZ
 *         in: query
 *         required: true
 *         description: Code of country
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные о последних наблюдений птиц
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       speciesCode:
 *                         type: string
 *                       comName:
 *                         type: string
 *                       sciName:
 *                         type: string
 *                       locId:
 *                         type: string
 *                       locName:
 *                         type: string
 *                       obsDt:
 *                         type: string
 *                       howMany:
 *                         type: number
 *                       lat:
 *                         type: number
 *                       lng:
 *                         type: number
 *                       obsValid:
 *                         type: boolean
 *                       obsReviewed:
 *                         type: boolean
 *                       locationPrivate:
 *                         type: boolean
 *                       subId:
 *                         type: string
 *
 *                 source:
 *                   type: string
 *                   example: api
 *       400:
 *         description: Parameter `regionCode` is empty or missing
 *       500:
 *         description: Getting data error
 */
router.get("/", myapiController.getRecentObservations);

/**
 * @swagger
 * /birds/cache/clear:
 *   post:
 *     summary: Clear cache
 *     tags:
 *       - Birds
 *     responses:
 *       200:
 *         description: Cache cleared
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'Cache cleared'
 */
router.post("/cache/clear", myapiController.clearCache);

/**
 * @swagger
 * /birds/cache/resize:
 *   post:
 *     summary: Resize Cache max size
 *     tags:
 *       - Birds
 *     parameters:
 *       - name: size
 *         in: query
 *         required: true
 *         description: Get new cache size
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cache size has been edited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'Cache size updated'
 *                 newSize:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Size isNan or hasn't been added
 */
router.post("/cache/resize", myapiController.resizeCache);

module.exports = router;
