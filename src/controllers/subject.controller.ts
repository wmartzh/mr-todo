import { Request, Response } from "express";
import { CreateSubjectSchema } from "../models/subject.model";
import subjectService from "../services/subject.service";
import { BaseController } from "../types/base.controller";
import { HttpError } from "../types/custom.error";

class SubjectController extends BaseController {
  /**
   * It validates the request body against the CreateSubjectSchema, then calls thesubjectService.create
   * function, and finally sends the response
   * @param {Request | any} req - Request | any:
   * @param {Response} res - Response - The response object that will be returned to the client.
   */
  async create(req: Request | any, res: Response) {
    try {
      const subjectData = await CreateSubjectSchema.validateAsync(req.body);
      this.responseHandler(
        res,
        await subjectService.create(req.user, subjectData),
        200
      );
      console.log(subjectData);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
  /**
   * It gets the user id from the request object, and then passes it to thesubjectService.getSubjectByUserId
   * function
   * @param {Request | any} req - Request | any: This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  async getSubjectByUser(req: Request | any, res: Response) {
    try {
      this.responseHandler(
        res,
        await subjectService.getSubjectByUserId(req.user.id),
        200
      );
    } catch (error) {
      this.errorHandler(res, error);
    }
  }

  /**
   * It gets a subject by id
   * @param {Request | any} req - Request | any: This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  async getSubjectById(req: Request | any, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new HttpError({ error: "Subject id is required" }, 400);
      }
      this.responseHandler(
        res,
        await subjectService.findById(req.user.id, Number(id)),
        200
      );
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
}
export default new SubjectController();
