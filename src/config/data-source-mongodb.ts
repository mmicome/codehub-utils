import { DataSource } from "typeorm";
import path from 'path'
const entities = path.resolve(__dirname, "../model/mongodb/*.entity.{ts,js}");

export const db = new DataSource({
  type: "mongodb",
  host: "localhost",
  database: "test",
  logging: ["query", "error"],
  entities: [entities],
})