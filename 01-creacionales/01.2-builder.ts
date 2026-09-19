/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

type ComparasionOperator = "=" | ">" | "<" | ">=" | "<=" | "!=" | "LIKE" | "IN" | "NOT IN" | "BETWEEN" | "NOT BETWEEN" | "IS NULL" | "IS NOT NULL";

interface Condition {
  field: string;
  operator: ComparasionOperator; 
  value: string | number;
}

interface orderBy {
  field: string;
  order: "ASC" | "DESC";
}

type whereClause =  | Condition | { AND: Condition[] } | { OR: Condition[] };

/**
 * Este es el plano del Query
 */
class Query {

  public table: string = "";
  public fields: string[] = [];
  public conditions?: whereClause;
  public order?: orderBy;
  public limit?: number;


  execute() {
    console.log(`
      SELECT ${this.fields.length > 0 ? this.fields.join(", ") : "*" }
      FROM ${this.table}
      ${(this.conditions) && `WHERE ${this.compileClause(this.conditions)}`}
      ${this.order ? `ORDER BY ${this.order.field} ${this.order.order}` : ""}
      ${this.limit ? `LIMIT ${this.limit}` : ""}
    `);
  }

  private compileClause(clause: whereClause): string {
    if('AND' in clause) {
      return clause.AND.map(condition => `${condition.field} ${condition.operator} ${condition.value}`).join(" AND ");
    }
    if('OR' in clause) {
      return clause.OR.map(condition => `${condition.field} ${condition.operator} ${condition.value}`).join(" OR ");
    }
    return `${clause.field} ${clause.operator} ${clause.value}`;
  }

}


/**
 * Constructor para la query*/
class QueryBuilder {
  
  private query: Query;

  constructor() {
    this.query = new Query()
  }

  setTable(table: string): QueryBuilder {
    this.query.table = table;
    return this;
  }

  select(fields: string[]): QueryBuilder {
    this.query.fields = fields;
    return this;
  }

  where(conditions: whereClause): QueryBuilder {
    this.query.conditions = conditions;
    return this;
  } 
  
  orderBy(conditions: orderBy): QueryBuilder {
    this.query.order = conditions;
    return this;
  } 
  
  limit(limit: number): QueryBuilder {
    this.query.limit = limit;
    return this;
  } 

  build() {
    return this.query;
  }
  

}


function main() {

  const usersQuery = new QueryBuilder().
    setTable("users")
    .select(["id","name","email","age"])
    .where({ AND: [
      {  field: "age", operator: ">", value: 18 }
    ]})
    .orderBy({ field: "name", order: "ASC" })
    .limit(10)
    .build();
  
  usersQuery.execute();

  const query = new QueryBuilder()
  .setTable('users')
  .select(['id', 'name'])
  .where({
    AND: [{ field: 'age', operator: '>', value: 18 }],
    OR: [
      { field: 'country', operator: '=', value: 'CRI' },
      { field: 'country', operator: '=', value: 'MEX' },
    ]}
  )
  .build();

  query.execute();

}

main();