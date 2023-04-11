
const service = require("./reviews.service");

async function list(res){
    const result = await service.list();
    res.json({data: result});
}

async function reviewExists(req, res, next){
    const result = await service.read(req.params.reviewId);
    if(result){
        res.locals.result = result;
        return next();
    }
    next({ status: 404,
        message: `Review id cannot be found.` });
}

async function update(req, res){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.result.review_id,
    };
    await service.update(updatedReview);
    res.json({ data: await service.read(updatedReview.review_id) });
}

async function destroy(res) {
    await service.delete(res.locals.result.review_id);
    console.log(res.locals.result.review_id);
    res.sendStatus(204);
}

module.exports = {
  list,
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
