import { NextFunction, Request, Response } from "express";
import {
  CheckViolationError,
  DataError,
  DBError,
  ForeignKeyViolationError,
  NotFoundError,
  NotNullViolationError,
  UniqueViolationError,
  ValidationError,
} from "objection";

export const objectionJsErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: err.data,
        });
        break;
      case "RelationExpression":
        res.status(400).send({
          message: err.message,
          type: "RelationExpression",
          data: {},
        });
        break;
      case "UnallowedRelation":
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: {},
        });
        break;
      case "InvalidGraph":
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: {},
        });
        break;
      default:
        res.status(400).send({
          message: err.message,
          type: "UnknownValidationError",
          data: {},
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      type: "NotFound",
      data: {},
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      message: `Unique constraint ${err.constraint} failed for table ${err.table} and columns ${err.columns}`,
      type: "UniqueViolation",
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      message: `Not null constraint failed for table ${err.table} and column ${err.column}`,
      type: "NotNullViolation",
      data: {
        column: err.column,
        table: err.table,
      },
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      message: `Foreign key violation for table ${err.table} and constraint ${err.constraint}`,
      type: "ForeignKeyViolation",
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      message: `Check violation failed for table ${err.table} and constraint ${err.constraint}`,
      type: "CheckViolation",
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      type: "InvalidData",
      data: {},
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      message: err.message,
      type: "UnknownDatabaseError",
      data: {},
    });
  } else {
    next(err);
  }
};
