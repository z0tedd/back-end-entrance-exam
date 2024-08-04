const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerImport = require("./swagger");

const myapiRoutes = require("./src/routes/myapiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
swaggerImport(app);
app.use("/birds", myapiRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
// const specs = swaggerJsdoc(options);
// app.use(express.json());
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
//
// app.get('/', (req, res) => {
// //  res.json({ message: 'Добро пожаловать в наше REST API!' });
// res.send('<h1>Hello Express</h1>');
// });
//
// app.get('/items', (req, res) => {
//   res.json({ items: [] });
// });
//
// app.get('/items/:id', (req, res) => {
//   res.json({ item: { id: req.params.id } });
// });
//
// app.post('/items', (req, res) => {
//   res.status(201).json({ item: req.body });
// });
//
// app.put('/items/:id', (req, res) => {
//   res.json({ item: { id: req.params.id, ...req.body } });
// });
//
// app.delete('/items/:id', (req, res) => {
//   res.status(204).end();
// });
