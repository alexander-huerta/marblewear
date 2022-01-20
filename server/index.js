const express = require('express');
const cors = require('cors');
const port = 3070;
const api = require('./helpers.js');


const app = express();

/* EXPRESS MIDDLEWARE */

app.use(express.static(__dirname + '/../client/dist/'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* PRODUCT DATA COMPONENT INITIALIZER */

app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params;
  let totalProductInfo = [api.getProductInfo(product_id), api.getProductStyles(product_id), api.getQuestions(product_id), api.getReviews({product_id}), api.getReviewsMetadata(product_id)];
  Promise.all(totalProductInfo)
    .then(results => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

/* CART HANDLERS */

app.get('/cart', (req, res) => {
  api.handleCart('get')
    .then(response => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

app.post('/cart', (req, res) => {
  const { sku_id } = req.body;
  api.handleCart('post', sku_id)
    .then(response => {
      res.status(201).send(response);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

/* RELATED PRODUCT HANDLERS */

app.get('/products/:product_id/related', (req, res) => {
  const { product_id } = req.params;
  api.getRelatedProducts(product_id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

/* R&R POST/PUT/GET HANDLERS */

app.post('/reviews', (req, res) => {
  api.postReview(req.body)
    .then((success) => {
      res.status(201).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

app.put('/reviews/:review_id/:type', (req, res) => {
  const { review_id } = req.params;
  const type = req.params.type;
  api.markReview(review_id, type)
    .then((success) => {
      res.status(204).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

app.get('/reviews/', (req, res) => {
  api.getReviews(req.query)
    .then((success) => {
      res.status(201).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

/* Q&A POST/PUT HANDLERS */

app.post('/qa/questions', (req, res) => {
  req.body.product_id = Number(req.body.product_id);
  api.postQuestion(req.body)
    .then((success) => {
      res.status(201).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  api.postAnswer(question_id, req.body)
    .then((success) => {
      res.status(201).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

app.put('/qa/questions/:question_id/:type', (req, res) => {
  const { question_id, type } = req.params;
  api.markQuestion(question_id, type)
    .then((success) => {
      res.status(204).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});

app.put('/qa/answers/:answer_id/:type', (req, res) => {
  const { answer_id, type } = req.params;
  const question_id = req.body;
  api.markAnswer(question_id, answer_id, type)
    .then((success) => {
      res.status(204).send(success);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
});


app.listen(port, () => {console.log(`listening on ${port}`);});