import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class CreateBaseTables1709654321000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Читаем SQL файл со схемой базы данных
    const schemaPath = path.join(__dirname, '../../../../docs/DATABASE_SCHEMA.md');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');

    // Извлекаем SQL запросы из markdown файла
    const sqlQueries = schemaContent
      .split('```sql')
      .slice(1)
      .map(block => block.split('```')[0].trim())
      .filter(query => query.startsWith('CREATE TABLE'));

    // Выполняем каждый запрос в транзакции
    await queryRunner.startTransaction();
    try {
      for (const query of sqlQueries) {
        await queryRunner.query(query);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем таблицы в обратном порядке
    const tables = [
      'audit_logs',
      'sessions',
      'notifications',
      'analytics_events',
      'teleton_transactions',
      'order_items',
      'orders',
      'products',
      'categories',
      'shops',
      'templates',
      'users'
    ];

    await queryRunner.startTransaction();
    try {
      for (const table of tables) {
        await queryRunner.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
} 