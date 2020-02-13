const express = require('express');
const postDatabase = require('./postDb');
const {validatePost, validatePostId } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => 
{
  postDatabase.get()
  .then(posts =>
  {
    res.status(200).json(posts);
  })  
  .catch(err =>
  {
    res.status(500).json({message: 'could not retrieve posts'});
  })
});

router.get('/:id', validatePostId, (req, res) => 
{
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => 
{
  postDatabase.remove(req.post.id)
  .then(removed =>
  {
    res.status(200).json({message: `Post with id of ${req.post.id} has been deleted`});
  })
  .catch(err =>
  {
    res.status(500).json({message: 'could not remove post from the database'});
  })
});

router.put('/:id', validatePostId, validatePost, (req, res) => 
{
  postDatabase.update(req.post.id, req.body)
  .then(updated =>
  {
    res.status(200).json({id: req.post.id, text: req.body.text});
  })
  .catch(err =>
  {
    res.status(500).json({message: 'error updating post'});
  })
});

module.exports = router;
