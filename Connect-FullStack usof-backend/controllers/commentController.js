import commentService from '../service/commentService.js';

class commentController {
    getComment = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const comment = await commentService.getComment(id);
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    getLikesByComment = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const likes = await commentService.getLikesByComment(id);
            return res.json(likes);
        } catch (e) {
            next(e);
        }
    }

    createLike = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const token = req.headers.authorization;
            const like = await commentService.createLike(id, token);
            return res.json(like);
        } catch (e) {
            next(e);
        }
    }

    updateComment = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const content = req.body.content;
            const comment = await commentService.updateComment(id, content);
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    blockComment = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const comment = await commentService.blockComment(id);
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    deleteComment = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const comment = await commentService.deleteComment(id);
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    deleteLike = async (req, res, next) => {
        try {
            const id = req.params.comment_id;
            const token = req.headers.authorization;
            const comment = await commentService.deleteLike(id, token);
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }
}

export default new commentController();