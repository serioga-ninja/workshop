import mongoose, { Schema, type Document } from 'mongoose';

export interface LogsSchema extends Document {
  message: string;
  level: string;
  payload: Record<string, unknown>;
}

const logsDataSchema = new Schema<LogsSchema>(
  {
    message: { type: String, required: true },
    level: { type: String, required: true },
    payload: { type: Schema.Types.Mixed },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

const LogsModel = mongoose.model<LogsSchema>('logs', logsDataSchema);

export default LogsModel;
