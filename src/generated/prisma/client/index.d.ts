
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Deck
 * 
 */
export type Deck = $Result.DefaultSelection<Prisma.$DeckPayload>
/**
 * Model Card
 * 
 */
export type Card = $Result.DefaultSelection<Prisma.$CardPayload>
/**
 * Model UserCardState
 * 
 */
export type UserCardState = $Result.DefaultSelection<Prisma.$UserCardStatePayload>
/**
 * Model ReviewLog
 * 
 */
export type ReviewLog = $Result.DefaultSelection<Prisma.$ReviewLogPayload>
/**
 * Model ImportJob
 * 
 */
export type ImportJob = $Result.DefaultSelection<Prisma.$ImportJobPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deck`: Exposes CRUD operations for the **Deck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Decks
    * const decks = await prisma.deck.findMany()
    * ```
    */
  get deck(): Prisma.DeckDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.card`: Exposes CRUD operations for the **Card** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cards
    * const cards = await prisma.card.findMany()
    * ```
    */
  get card(): Prisma.CardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCardState`: Exposes CRUD operations for the **UserCardState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCardStates
    * const userCardStates = await prisma.userCardState.findMany()
    * ```
    */
  get userCardState(): Prisma.UserCardStateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reviewLog`: Exposes CRUD operations for the **ReviewLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReviewLogs
    * const reviewLogs = await prisma.reviewLog.findMany()
    * ```
    */
  get reviewLog(): Prisma.ReviewLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importJob`: Exposes CRUD operations for the **ImportJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImportJobs
    * const importJobs = await prisma.importJob.findMany()
    * ```
    */
  get importJob(): Prisma.ImportJobDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    Deck: 'Deck',
    Card: 'Card',
    UserCardState: 'UserCardState',
    ReviewLog: 'ReviewLog',
    ImportJob: 'ImportJob'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "deck" | "card" | "userCardState" | "reviewLog" | "importJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Deck: {
        payload: Prisma.$DeckPayload<ExtArgs>
        fields: Prisma.DeckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          findFirst: {
            args: Prisma.DeckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          findMany: {
            args: Prisma.DeckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>[]
          }
          create: {
            args: Prisma.DeckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          createMany: {
            args: Prisma.DeckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>[]
          }
          delete: {
            args: Prisma.DeckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          update: {
            args: Prisma.DeckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          deleteMany: {
            args: Prisma.DeckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeckUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>[]
          }
          upsert: {
            args: Prisma.DeckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          aggregate: {
            args: Prisma.DeckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeck>
          }
          groupBy: {
            args: Prisma.DeckGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeckGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeckCountArgs<ExtArgs>
            result: $Utils.Optional<DeckCountAggregateOutputType> | number
          }
        }
      }
      Card: {
        payload: Prisma.$CardPayload<ExtArgs>
        fields: Prisma.CardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findFirst: {
            args: Prisma.CardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findMany: {
            args: Prisma.CardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          create: {
            args: Prisma.CardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          createMany: {
            args: Prisma.CardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          delete: {
            args: Prisma.CardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          update: {
            args: Prisma.CardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          deleteMany: {
            args: Prisma.CardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          upsert: {
            args: Prisma.CardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          aggregate: {
            args: Prisma.CardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard>
          }
          groupBy: {
            args: Prisma.CardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardCountArgs<ExtArgs>
            result: $Utils.Optional<CardCountAggregateOutputType> | number
          }
        }
      }
      UserCardState: {
        payload: Prisma.$UserCardStatePayload<ExtArgs>
        fields: Prisma.UserCardStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCardStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCardStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>
          }
          findFirst: {
            args: Prisma.UserCardStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCardStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>
          }
          findMany: {
            args: Prisma.UserCardStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>[]
          }
          create: {
            args: Prisma.UserCardStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>
          }
          createMany: {
            args: Prisma.UserCardStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCardStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>[]
          }
          delete: {
            args: Prisma.UserCardStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>
          }
          update: {
            args: Prisma.UserCardStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>
          }
          deleteMany: {
            args: Prisma.UserCardStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCardStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCardStateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>[]
          }
          upsert: {
            args: Prisma.UserCardStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardStatePayload>
          }
          aggregate: {
            args: Prisma.UserCardStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCardState>
          }
          groupBy: {
            args: Prisma.UserCardStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCardStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCardStateCountArgs<ExtArgs>
            result: $Utils.Optional<UserCardStateCountAggregateOutputType> | number
          }
        }
      }
      ReviewLog: {
        payload: Prisma.$ReviewLogPayload<ExtArgs>
        fields: Prisma.ReviewLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          findFirst: {
            args: Prisma.ReviewLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          findMany: {
            args: Prisma.ReviewLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>[]
          }
          create: {
            args: Prisma.ReviewLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          createMany: {
            args: Prisma.ReviewLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>[]
          }
          delete: {
            args: Prisma.ReviewLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          update: {
            args: Prisma.ReviewLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          deleteMany: {
            args: Prisma.ReviewLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>[]
          }
          upsert: {
            args: Prisma.ReviewLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          aggregate: {
            args: Prisma.ReviewLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviewLog>
          }
          groupBy: {
            args: Prisma.ReviewLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewLogCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewLogCountAggregateOutputType> | number
          }
        }
      }
      ImportJob: {
        payload: Prisma.$ImportJobPayload<ExtArgs>
        fields: Prisma.ImportJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>
          }
          findFirst: {
            args: Prisma.ImportJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>
          }
          findMany: {
            args: Prisma.ImportJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>[]
          }
          create: {
            args: Prisma.ImportJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>
          }
          createMany: {
            args: Prisma.ImportJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImportJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>[]
          }
          delete: {
            args: Prisma.ImportJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>
          }
          update: {
            args: Prisma.ImportJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>
          }
          deleteMany: {
            args: Prisma.ImportJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImportJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>[]
          }
          upsert: {
            args: Prisma.ImportJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportJobPayload>
          }
          aggregate: {
            args: Prisma.ImportJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportJob>
          }
          groupBy: {
            args: Prisma.ImportJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImportJobCountArgs<ExtArgs>
            result: $Utils.Optional<ImportJobCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    deck?: DeckOmit
    card?: CardOmit
    userCardState?: UserCardStateOmit
    reviewLog?: ReviewLogOmit
    importJob?: ImportJobOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    decks: number
    cardStates: number
    reviewLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    decks?: boolean | UserCountOutputTypeCountDecksArgs
    cardStates?: boolean | UserCountOutputTypeCountCardStatesArgs
    reviewLogs?: boolean | UserCountOutputTypeCountReviewLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeckWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCardStatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardStateWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
  }


  /**
   * Count Type DeckCountOutputType
   */

  export type DeckCountOutputType = {
    cards: number
    imports: number
  }

  export type DeckCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | DeckCountOutputTypeCountCardsArgs
    imports?: boolean | DeckCountOutputTypeCountImportsArgs
  }

  // Custom InputTypes
  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeckCountOutputType
     */
    select?: DeckCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
  }

  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeCountImportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportJobWhereInput
  }


  /**
   * Count Type CardCountOutputType
   */

  export type CardCountOutputType = {
    userStates: number
    reviews: number
  }

  export type CardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userStates?: boolean | CardCountOutputTypeCountUserStatesArgs
    reviews?: boolean | CardCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardCountOutputType
     */
    select?: CardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountUserStatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardStateWhereInput
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
  }


  /**
   * Count Type UserCardStateCountOutputType
   */

  export type UserCardStateCountOutputType = {
    reviews: number
  }

  export type UserCardStateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | UserCardStateCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCardStateCountOutputType without action
   */
  export type UserCardStateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardStateCountOutputType
     */
    select?: UserCardStateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCardStateCountOutputType without action
   */
  export type UserCardStateCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    emailVerified: number
    name: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    decks?: boolean | User$decksArgs<ExtArgs>
    cardStates?: boolean | User$cardStatesArgs<ExtArgs>
    reviewLogs?: boolean | User$reviewLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "emailVerified" | "name" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    decks?: boolean | User$decksArgs<ExtArgs>
    cardStates?: boolean | User$cardStatesArgs<ExtArgs>
    reviewLogs?: boolean | User$reviewLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      decks: Prisma.$DeckPayload<ExtArgs>[]
      cardStates: Prisma.$UserCardStatePayload<ExtArgs>[]
      reviewLogs: Prisma.$ReviewLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      emailVerified: Date | null
      name: string | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    decks<T extends User$decksArgs<ExtArgs> = {}>(args?: Subset<T, User$decksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cardStates<T extends User$cardStatesArgs<ExtArgs> = {}>(args?: Subset<T, User$cardStatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewLogs<T extends User$reviewLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.decks
   */
  export type User$decksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    where?: DeckWhereInput
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    cursor?: DeckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * User.cardStates
   */
  export type User$cardStatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    where?: UserCardStateWhereInput
    orderBy?: UserCardStateOrderByWithRelationInput | UserCardStateOrderByWithRelationInput[]
    cursor?: UserCardStateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCardStateScalarFieldEnum | UserCardStateScalarFieldEnum[]
  }

  /**
   * User.reviewLogs
   */
  export type User$reviewLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    cursor?: ReviewLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const accountWithUserIdOnly = await prisma.account.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    sessionToken: number
    userId: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    sessionToken: string
    userId: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sessionToken" | "userId" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sessionToken: string
      userId: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.findMany({ select: { sessionToken: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.createManyAndReturn({
     *   select: { sessionToken: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.updateManyAndReturn({
     *   select: { sessionToken: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Deck
   */

  export type AggregateDeck = {
    _count: DeckCountAggregateOutputType | null
    _min: DeckMinAggregateOutputType | null
    _max: DeckMaxAggregateOutputType | null
  }

  export type DeckMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    title: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sourceFingerprint: string | null
  }

  export type DeckMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    title: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sourceFingerprint: string | null
  }

  export type DeckCountAggregateOutputType = {
    id: number
    ownerId: number
    title: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    sourceFingerprint: number
    _all: number
  }


  export type DeckMinAggregateInputType = {
    id?: true
    ownerId?: true
    title?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    sourceFingerprint?: true
  }

  export type DeckMaxAggregateInputType = {
    id?: true
    ownerId?: true
    title?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    sourceFingerprint?: true
  }

  export type DeckCountAggregateInputType = {
    id?: true
    ownerId?: true
    title?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    sourceFingerprint?: true
    _all?: true
  }

  export type DeckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deck to aggregate.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Decks
    **/
    _count?: true | DeckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeckMaxAggregateInputType
  }

  export type GetDeckAggregateType<T extends DeckAggregateArgs> = {
        [P in keyof T & keyof AggregateDeck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeck[P]>
      : GetScalarType<T[P], AggregateDeck[P]>
  }




  export type DeckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeckWhereInput
    orderBy?: DeckOrderByWithAggregationInput | DeckOrderByWithAggregationInput[]
    by: DeckScalarFieldEnum[] | DeckScalarFieldEnum
    having?: DeckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeckCountAggregateInputType | true
    _min?: DeckMinAggregateInputType
    _max?: DeckMaxAggregateInputType
  }

  export type DeckGroupByOutputType = {
    id: string
    ownerId: string
    title: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    sourceFingerprint: string | null
    _count: DeckCountAggregateOutputType | null
    _min: DeckMinAggregateOutputType | null
    _max: DeckMaxAggregateOutputType | null
  }

  type GetDeckGroupByPayload<T extends DeckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeckGroupByOutputType[P]>
            : GetScalarType<T[P], DeckGroupByOutputType[P]>
        }
      >
    >


  export type DeckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceFingerprint?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    cards?: boolean | Deck$cardsArgs<ExtArgs>
    imports?: boolean | Deck$importsArgs<ExtArgs>
    _count?: boolean | DeckCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deck"]>

  export type DeckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceFingerprint?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deck"]>

  export type DeckSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceFingerprint?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deck"]>

  export type DeckSelectScalar = {
    id?: boolean
    ownerId?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceFingerprint?: boolean
  }

  export type DeckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "title" | "slug" | "description" | "createdAt" | "updatedAt" | "sourceFingerprint", ExtArgs["result"]["deck"]>
  export type DeckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    cards?: boolean | Deck$cardsArgs<ExtArgs>
    imports?: boolean | Deck$importsArgs<ExtArgs>
    _count?: boolean | DeckCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeckIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DeckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deck"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      cards: Prisma.$CardPayload<ExtArgs>[]
      imports: Prisma.$ImportJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      title: string
      slug: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      sourceFingerprint: string | null
    }, ExtArgs["result"]["deck"]>
    composites: {}
  }

  type DeckGetPayload<S extends boolean | null | undefined | DeckDefaultArgs> = $Result.GetResult<Prisma.$DeckPayload, S>

  type DeckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeckCountAggregateInputType | true
    }

  export interface DeckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deck'], meta: { name: 'Deck' } }
    /**
     * Find zero or one Deck that matches the filter.
     * @param {DeckFindUniqueArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeckFindUniqueArgs>(args: SelectSubset<T, DeckFindUniqueArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeckFindUniqueOrThrowArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeckFindUniqueOrThrowArgs>(args: SelectSubset<T, DeckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckFindFirstArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeckFindFirstArgs>(args?: SelectSubset<T, DeckFindFirstArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckFindFirstOrThrowArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeckFindFirstOrThrowArgs>(args?: SelectSubset<T, DeckFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Decks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Decks
     * const decks = await prisma.deck.findMany()
     * 
     * // Get first 10 Decks
     * const decks = await prisma.deck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deckWithIdOnly = await prisma.deck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeckFindManyArgs>(args?: SelectSubset<T, DeckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deck.
     * @param {DeckCreateArgs} args - Arguments to create a Deck.
     * @example
     * // Create one Deck
     * const Deck = await prisma.deck.create({
     *   data: {
     *     // ... data to create a Deck
     *   }
     * })
     * 
     */
    create<T extends DeckCreateArgs>(args: SelectSubset<T, DeckCreateArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Decks.
     * @param {DeckCreateManyArgs} args - Arguments to create many Decks.
     * @example
     * // Create many Decks
     * const deck = await prisma.deck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeckCreateManyArgs>(args?: SelectSubset<T, DeckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Decks and returns the data saved in the database.
     * @param {DeckCreateManyAndReturnArgs} args - Arguments to create many Decks.
     * @example
     * // Create many Decks
     * const deck = await prisma.deck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Decks and only return the `id`
     * const deckWithIdOnly = await prisma.deck.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeckCreateManyAndReturnArgs>(args?: SelectSubset<T, DeckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deck.
     * @param {DeckDeleteArgs} args - Arguments to delete one Deck.
     * @example
     * // Delete one Deck
     * const Deck = await prisma.deck.delete({
     *   where: {
     *     // ... filter to delete one Deck
     *   }
     * })
     * 
     */
    delete<T extends DeckDeleteArgs>(args: SelectSubset<T, DeckDeleteArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deck.
     * @param {DeckUpdateArgs} args - Arguments to update one Deck.
     * @example
     * // Update one Deck
     * const deck = await prisma.deck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeckUpdateArgs>(args: SelectSubset<T, DeckUpdateArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Decks.
     * @param {DeckDeleteManyArgs} args - Arguments to filter Decks to delete.
     * @example
     * // Delete a few Decks
     * const { count } = await prisma.deck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeckDeleteManyArgs>(args?: SelectSubset<T, DeckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Decks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Decks
     * const deck = await prisma.deck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeckUpdateManyArgs>(args: SelectSubset<T, DeckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Decks and returns the data updated in the database.
     * @param {DeckUpdateManyAndReturnArgs} args - Arguments to update many Decks.
     * @example
     * // Update many Decks
     * const deck = await prisma.deck.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Decks and only return the `id`
     * const deckWithIdOnly = await prisma.deck.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeckUpdateManyAndReturnArgs>(args: SelectSubset<T, DeckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deck.
     * @param {DeckUpsertArgs} args - Arguments to update or create a Deck.
     * @example
     * // Update or create a Deck
     * const deck = await prisma.deck.upsert({
     *   create: {
     *     // ... data to create a Deck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deck we want to update
     *   }
     * })
     */
    upsert<T extends DeckUpsertArgs>(args: SelectSubset<T, DeckUpsertArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Decks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckCountArgs} args - Arguments to filter Decks to count.
     * @example
     * // Count the number of Decks
     * const count = await prisma.deck.count({
     *   where: {
     *     // ... the filter for the Decks we want to count
     *   }
     * })
    **/
    count<T extends DeckCountArgs>(
      args?: Subset<T, DeckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeckAggregateArgs>(args: Subset<T, DeckAggregateArgs>): Prisma.PrismaPromise<GetDeckAggregateType<T>>

    /**
     * Group by Deck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeckGroupByArgs['orderBy'] }
        : { orderBy?: DeckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deck model
   */
  readonly fields: DeckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cards<T extends Deck$cardsArgs<ExtArgs> = {}>(args?: Subset<T, Deck$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    imports<T extends Deck$importsArgs<ExtArgs> = {}>(args?: Subset<T, Deck$importsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deck model
   */
  interface DeckFieldRefs {
    readonly id: FieldRef<"Deck", 'String'>
    readonly ownerId: FieldRef<"Deck", 'String'>
    readonly title: FieldRef<"Deck", 'String'>
    readonly slug: FieldRef<"Deck", 'String'>
    readonly description: FieldRef<"Deck", 'String'>
    readonly createdAt: FieldRef<"Deck", 'DateTime'>
    readonly updatedAt: FieldRef<"Deck", 'DateTime'>
    readonly sourceFingerprint: FieldRef<"Deck", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Deck findUnique
   */
  export type DeckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck findUniqueOrThrow
   */
  export type DeckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck findFirst
   */
  export type DeckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Decks.
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Decks.
     */
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck findFirstOrThrow
   */
  export type DeckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Decks.
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Decks.
     */
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck findMany
   */
  export type DeckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Decks to fetch.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Decks.
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck create
   */
  export type DeckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * The data needed to create a Deck.
     */
    data: XOR<DeckCreateInput, DeckUncheckedCreateInput>
  }

  /**
   * Deck createMany
   */
  export type DeckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Decks.
     */
    data: DeckCreateManyInput | DeckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deck createManyAndReturn
   */
  export type DeckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * The data used to create many Decks.
     */
    data: DeckCreateManyInput | DeckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deck update
   */
  export type DeckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * The data needed to update a Deck.
     */
    data: XOR<DeckUpdateInput, DeckUncheckedUpdateInput>
    /**
     * Choose, which Deck to update.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck updateMany
   */
  export type DeckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Decks.
     */
    data: XOR<DeckUpdateManyMutationInput, DeckUncheckedUpdateManyInput>
    /**
     * Filter which Decks to update
     */
    where?: DeckWhereInput
    /**
     * Limit how many Decks to update.
     */
    limit?: number
  }

  /**
   * Deck updateManyAndReturn
   */
  export type DeckUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * The data used to update Decks.
     */
    data: XOR<DeckUpdateManyMutationInput, DeckUncheckedUpdateManyInput>
    /**
     * Filter which Decks to update
     */
    where?: DeckWhereInput
    /**
     * Limit how many Decks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deck upsert
   */
  export type DeckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * The filter to search for the Deck to update in case it exists.
     */
    where: DeckWhereUniqueInput
    /**
     * In case the Deck found by the `where` argument doesn't exist, create a new Deck with this data.
     */
    create: XOR<DeckCreateInput, DeckUncheckedCreateInput>
    /**
     * In case the Deck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeckUpdateInput, DeckUncheckedUpdateInput>
  }

  /**
   * Deck delete
   */
  export type DeckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter which Deck to delete.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck deleteMany
   */
  export type DeckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Decks to delete
     */
    where?: DeckWhereInput
    /**
     * Limit how many Decks to delete.
     */
    limit?: number
  }

  /**
   * Deck.cards
   */
  export type Deck$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    cursor?: CardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Deck.imports
   */
  export type Deck$importsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    where?: ImportJobWhereInput
    orderBy?: ImportJobOrderByWithRelationInput | ImportJobOrderByWithRelationInput[]
    cursor?: ImportJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImportJobScalarFieldEnum | ImportJobScalarFieldEnum[]
  }

  /**
   * Deck without action
   */
  export type DeckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deck
     */
    omit?: DeckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
  }


  /**
   * Model Card
   */

  export type AggregateCard = {
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  export type CardAvgAggregateOutputType = {
    difficultyBase: number | null
  }

  export type CardSumAggregateOutputType = {
    difficultyBase: number | null
  }

  export type CardMinAggregateOutputType = {
    id: string | null
    deckId: string | null
    externalRowId: string | null
    armenianScript: string | null
    translit: string | null
    englishMeaning: string | null
    exampleSentence: string | null
    exampleTranslation: string | null
    grammar: string | null
    cheatPhrase: string | null
    topic: string | null
    difficultyBase: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CardMaxAggregateOutputType = {
    id: string | null
    deckId: string | null
    externalRowId: string | null
    armenianScript: string | null
    translit: string | null
    englishMeaning: string | null
    exampleSentence: string | null
    exampleTranslation: string | null
    grammar: string | null
    cheatPhrase: string | null
    topic: string | null
    difficultyBase: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CardCountAggregateOutputType = {
    id: number
    deckId: number
    externalRowId: number
    armenianScript: number
    translit: number
    englishMeaning: number
    exampleSentence: number
    exampleTranslation: number
    grammar: number
    cheatPhrase: number
    topic: number
    difficultyBase: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CardAvgAggregateInputType = {
    difficultyBase?: true
  }

  export type CardSumAggregateInputType = {
    difficultyBase?: true
  }

  export type CardMinAggregateInputType = {
    id?: true
    deckId?: true
    externalRowId?: true
    armenianScript?: true
    translit?: true
    englishMeaning?: true
    exampleSentence?: true
    exampleTranslation?: true
    grammar?: true
    cheatPhrase?: true
    topic?: true
    difficultyBase?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CardMaxAggregateInputType = {
    id?: true
    deckId?: true
    externalRowId?: true
    armenianScript?: true
    translit?: true
    englishMeaning?: true
    exampleSentence?: true
    exampleTranslation?: true
    grammar?: true
    cheatPhrase?: true
    topic?: true
    difficultyBase?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CardCountAggregateInputType = {
    id?: true
    deckId?: true
    externalRowId?: true
    armenianScript?: true
    translit?: true
    englishMeaning?: true
    exampleSentence?: true
    exampleTranslation?: true
    grammar?: true
    cheatPhrase?: true
    topic?: true
    difficultyBase?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Card to aggregate.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cards
    **/
    _count?: true | CardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardMaxAggregateInputType
  }

  export type GetCardAggregateType<T extends CardAggregateArgs> = {
        [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard[P]>
      : GetScalarType<T[P], AggregateCard[P]>
  }




  export type CardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
    orderBy?: CardOrderByWithAggregationInput | CardOrderByWithAggregationInput[]
    by: CardScalarFieldEnum[] | CardScalarFieldEnum
    having?: CardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardCountAggregateInputType | true
    _avg?: CardAvgAggregateInputType
    _sum?: CardSumAggregateInputType
    _min?: CardMinAggregateInputType
    _max?: CardMaxAggregateInputType
  }

  export type CardGroupByOutputType = {
    id: string
    deckId: string
    externalRowId: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence: string | null
    exampleTranslation: string | null
    grammar: string | null
    cheatPhrase: string | null
    topic: string | null
    difficultyBase: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  type GetCardGroupByPayload<T extends CardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardGroupByOutputType[P]>
            : GetScalarType<T[P], CardGroupByOutputType[P]>
        }
      >
    >


  export type CardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deckId?: boolean
    externalRowId?: boolean
    armenianScript?: boolean
    translit?: boolean
    englishMeaning?: boolean
    exampleSentence?: boolean
    exampleTranslation?: boolean
    grammar?: boolean
    cheatPhrase?: boolean
    topic?: boolean
    difficultyBase?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deck?: boolean | DeckDefaultArgs<ExtArgs>
    userStates?: boolean | Card$userStatesArgs<ExtArgs>
    reviews?: boolean | Card$reviewsArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type CardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deckId?: boolean
    externalRowId?: boolean
    armenianScript?: boolean
    translit?: boolean
    englishMeaning?: boolean
    exampleSentence?: boolean
    exampleTranslation?: boolean
    grammar?: boolean
    cheatPhrase?: boolean
    topic?: boolean
    difficultyBase?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type CardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deckId?: boolean
    externalRowId?: boolean
    armenianScript?: boolean
    translit?: boolean
    englishMeaning?: boolean
    exampleSentence?: boolean
    exampleTranslation?: boolean
    grammar?: boolean
    cheatPhrase?: boolean
    topic?: boolean
    difficultyBase?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type CardSelectScalar = {
    id?: boolean
    deckId?: boolean
    externalRowId?: boolean
    armenianScript?: boolean
    translit?: boolean
    englishMeaning?: boolean
    exampleSentence?: boolean
    exampleTranslation?: boolean
    grammar?: boolean
    cheatPhrase?: boolean
    topic?: boolean
    difficultyBase?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deckId" | "externalRowId" | "armenianScript" | "translit" | "englishMeaning" | "exampleSentence" | "exampleTranslation" | "grammar" | "cheatPhrase" | "topic" | "difficultyBase" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["card"]>
  export type CardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deck?: boolean | DeckDefaultArgs<ExtArgs>
    userStates?: boolean | Card$userStatesArgs<ExtArgs>
    reviews?: boolean | Card$reviewsArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }
  export type CardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }

  export type $CardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Card"
    objects: {
      deck: Prisma.$DeckPayload<ExtArgs>
      userStates: Prisma.$UserCardStatePayload<ExtArgs>[]
      reviews: Prisma.$ReviewLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deckId: string
      externalRowId: string | null
      armenianScript: string
      translit: string
      englishMeaning: string
      exampleSentence: string | null
      exampleTranslation: string | null
      grammar: string | null
      cheatPhrase: string | null
      topic: string | null
      difficultyBase: number | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["card"]>
    composites: {}
  }

  type CardGetPayload<S extends boolean | null | undefined | CardDefaultArgs> = $Result.GetResult<Prisma.$CardPayload, S>

  type CardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardCountAggregateInputType | true
    }

  export interface CardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Card'], meta: { name: 'Card' } }
    /**
     * Find zero or one Card that matches the filter.
     * @param {CardFindUniqueArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardFindUniqueArgs>(args: SelectSubset<T, CardFindUniqueArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Card that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardFindUniqueOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardFindUniqueOrThrowArgs>(args: SelectSubset<T, CardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardFindFirstArgs>(args?: SelectSubset<T, CardFindFirstArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardFindFirstOrThrowArgs>(args?: SelectSubset<T, CardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cards
     * const cards = await prisma.card.findMany()
     * 
     * // Get first 10 Cards
     * const cards = await prisma.card.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardWithIdOnly = await prisma.card.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardFindManyArgs>(args?: SelectSubset<T, CardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Card.
     * @param {CardCreateArgs} args - Arguments to create a Card.
     * @example
     * // Create one Card
     * const Card = await prisma.card.create({
     *   data: {
     *     // ... data to create a Card
     *   }
     * })
     * 
     */
    create<T extends CardCreateArgs>(args: SelectSubset<T, CardCreateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cards.
     * @param {CardCreateManyArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardCreateManyArgs>(args?: SelectSubset<T, CardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cards and returns the data saved in the database.
     * @param {CardCreateManyAndReturnArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CardCreateManyAndReturnArgs>(args?: SelectSubset<T, CardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Card.
     * @param {CardDeleteArgs} args - Arguments to delete one Card.
     * @example
     * // Delete one Card
     * const Card = await prisma.card.delete({
     *   where: {
     *     // ... filter to delete one Card
     *   }
     * })
     * 
     */
    delete<T extends CardDeleteArgs>(args: SelectSubset<T, CardDeleteArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Card.
     * @param {CardUpdateArgs} args - Arguments to update one Card.
     * @example
     * // Update one Card
     * const card = await prisma.card.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardUpdateArgs>(args: SelectSubset<T, CardUpdateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cards.
     * @param {CardDeleteManyArgs} args - Arguments to filter Cards to delete.
     * @example
     * // Delete a few Cards
     * const { count } = await prisma.card.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardDeleteManyArgs>(args?: SelectSubset<T, CardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardUpdateManyArgs>(args: SelectSubset<T, CardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards and returns the data updated in the database.
     * @param {CardUpdateManyAndReturnArgs} args - Arguments to update many Cards.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CardUpdateManyAndReturnArgs>(args: SelectSubset<T, CardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Card.
     * @param {CardUpsertArgs} args - Arguments to update or create a Card.
     * @example
     * // Update or create a Card
     * const card = await prisma.card.upsert({
     *   create: {
     *     // ... data to create a Card
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card we want to update
     *   }
     * })
     */
    upsert<T extends CardUpsertArgs>(args: SelectSubset<T, CardUpsertArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardCountArgs} args - Arguments to filter Cards to count.
     * @example
     * // Count the number of Cards
     * const count = await prisma.card.count({
     *   where: {
     *     // ... the filter for the Cards we want to count
     *   }
     * })
    **/
    count<T extends CardCountArgs>(
      args?: Subset<T, CardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardAggregateArgs>(args: Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>

    /**
     * Group by Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardGroupByArgs['orderBy'] }
        : { orderBy?: CardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Card model
   */
  readonly fields: CardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Card.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deck<T extends DeckDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeckDefaultArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userStates<T extends Card$userStatesArgs<ExtArgs> = {}>(args?: Subset<T, Card$userStatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Card$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Card$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Card model
   */
  interface CardFieldRefs {
    readonly id: FieldRef<"Card", 'String'>
    readonly deckId: FieldRef<"Card", 'String'>
    readonly externalRowId: FieldRef<"Card", 'String'>
    readonly armenianScript: FieldRef<"Card", 'String'>
    readonly translit: FieldRef<"Card", 'String'>
    readonly englishMeaning: FieldRef<"Card", 'String'>
    readonly exampleSentence: FieldRef<"Card", 'String'>
    readonly exampleTranslation: FieldRef<"Card", 'String'>
    readonly grammar: FieldRef<"Card", 'String'>
    readonly cheatPhrase: FieldRef<"Card", 'String'>
    readonly topic: FieldRef<"Card", 'String'>
    readonly difficultyBase: FieldRef<"Card", 'Int'>
    readonly isActive: FieldRef<"Card", 'Boolean'>
    readonly createdAt: FieldRef<"Card", 'DateTime'>
    readonly updatedAt: FieldRef<"Card", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Card findUnique
   */
  export type CardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findUniqueOrThrow
   */
  export type CardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findFirst
   */
  export type CardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findFirstOrThrow
   */
  export type CardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findMany
   */
  export type CardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Cards to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card create
   */
  export type CardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to create a Card.
     */
    data: XOR<CardCreateInput, CardUncheckedCreateInput>
  }

  /**
   * Card createMany
   */
  export type CardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Card createManyAndReturn
   */
  export type CardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Card update
   */
  export type CardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to update a Card.
     */
    data: XOR<CardUpdateInput, CardUncheckedUpdateInput>
    /**
     * Choose, which Card to update.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card updateMany
   */
  export type CardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to update.
     */
    limit?: number
  }

  /**
   * Card updateManyAndReturn
   */
  export type CardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Card upsert
   */
  export type CardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The filter to search for the Card to update in case it exists.
     */
    where: CardWhereUniqueInput
    /**
     * In case the Card found by the `where` argument doesn't exist, create a new Card with this data.
     */
    create: XOR<CardCreateInput, CardUncheckedCreateInput>
    /**
     * In case the Card was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardUpdateInput, CardUncheckedUpdateInput>
  }

  /**
   * Card delete
   */
  export type CardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter which Card to delete.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card deleteMany
   */
  export type CardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cards to delete
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to delete.
     */
    limit?: number
  }

  /**
   * Card.userStates
   */
  export type Card$userStatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    where?: UserCardStateWhereInput
    orderBy?: UserCardStateOrderByWithRelationInput | UserCardStateOrderByWithRelationInput[]
    cursor?: UserCardStateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCardStateScalarFieldEnum | UserCardStateScalarFieldEnum[]
  }

  /**
   * Card.reviews
   */
  export type Card$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    cursor?: ReviewLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * Card without action
   */
  export type CardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
  }


  /**
   * Model UserCardState
   */

  export type AggregateUserCardState = {
    _count: UserCardStateCountAggregateOutputType | null
    _avg: UserCardStateAvgAggregateOutputType | null
    _sum: UserCardStateSumAggregateOutputType | null
    _min: UserCardStateMinAggregateOutputType | null
    _max: UserCardStateMaxAggregateOutputType | null
  }

  export type UserCardStateAvgAggregateOutputType = {
    easeFactor: number | null
    interval: number | null
    repetitions: number | null
    lapses: number | null
  }

  export type UserCardStateSumAggregateOutputType = {
    easeFactor: number | null
    interval: number | null
    repetitions: number | null
    lapses: number | null
  }

  export type UserCardStateMinAggregateOutputType = {
    id: string | null
    userId: string | null
    cardId: string | null
    easeFactor: number | null
    interval: number | null
    repetitions: number | null
    lapses: number | null
    dueAt: Date | null
    lastReviewedAt: Date | null
    isForwardLearned: boolean | null
    isReverseLearned: boolean | null
    isMastered: boolean | null
    suspendedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCardStateMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    cardId: string | null
    easeFactor: number | null
    interval: number | null
    repetitions: number | null
    lapses: number | null
    dueAt: Date | null
    lastReviewedAt: Date | null
    isForwardLearned: boolean | null
    isReverseLearned: boolean | null
    isMastered: boolean | null
    suspendedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCardStateCountAggregateOutputType = {
    id: number
    userId: number
    cardId: number
    easeFactor: number
    interval: number
    repetitions: number
    lapses: number
    dueAt: number
    lastReviewedAt: number
    isForwardLearned: number
    isReverseLearned: number
    isMastered: number
    suspendedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserCardStateAvgAggregateInputType = {
    easeFactor?: true
    interval?: true
    repetitions?: true
    lapses?: true
  }

  export type UserCardStateSumAggregateInputType = {
    easeFactor?: true
    interval?: true
    repetitions?: true
    lapses?: true
  }

  export type UserCardStateMinAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    easeFactor?: true
    interval?: true
    repetitions?: true
    lapses?: true
    dueAt?: true
    lastReviewedAt?: true
    isForwardLearned?: true
    isReverseLearned?: true
    isMastered?: true
    suspendedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCardStateMaxAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    easeFactor?: true
    interval?: true
    repetitions?: true
    lapses?: true
    dueAt?: true
    lastReviewedAt?: true
    isForwardLearned?: true
    isReverseLearned?: true
    isMastered?: true
    suspendedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCardStateCountAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    easeFactor?: true
    interval?: true
    repetitions?: true
    lapses?: true
    dueAt?: true
    lastReviewedAt?: true
    isForwardLearned?: true
    isReverseLearned?: true
    isMastered?: true
    suspendedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserCardStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCardState to aggregate.
     */
    where?: UserCardStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCardStates to fetch.
     */
    orderBy?: UserCardStateOrderByWithRelationInput | UserCardStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCardStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCardStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCardStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCardStates
    **/
    _count?: true | UserCardStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserCardStateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserCardStateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCardStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCardStateMaxAggregateInputType
  }

  export type GetUserCardStateAggregateType<T extends UserCardStateAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCardState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCardState[P]>
      : GetScalarType<T[P], AggregateUserCardState[P]>
  }




  export type UserCardStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardStateWhereInput
    orderBy?: UserCardStateOrderByWithAggregationInput | UserCardStateOrderByWithAggregationInput[]
    by: UserCardStateScalarFieldEnum[] | UserCardStateScalarFieldEnum
    having?: UserCardStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCardStateCountAggregateInputType | true
    _avg?: UserCardStateAvgAggregateInputType
    _sum?: UserCardStateSumAggregateInputType
    _min?: UserCardStateMinAggregateInputType
    _max?: UserCardStateMaxAggregateInputType
  }

  export type UserCardStateGroupByOutputType = {
    id: string
    userId: string
    cardId: string
    easeFactor: number
    interval: number
    repetitions: number
    lapses: number
    dueAt: Date
    lastReviewedAt: Date | null
    isForwardLearned: boolean
    isReverseLearned: boolean
    isMastered: boolean
    suspendedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCardStateCountAggregateOutputType | null
    _avg: UserCardStateAvgAggregateOutputType | null
    _sum: UserCardStateSumAggregateOutputType | null
    _min: UserCardStateMinAggregateOutputType | null
    _max: UserCardStateMaxAggregateOutputType | null
  }

  type GetUserCardStateGroupByPayload<T extends UserCardStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCardStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCardStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCardStateGroupByOutputType[P]>
            : GetScalarType<T[P], UserCardStateGroupByOutputType[P]>
        }
      >
    >


  export type UserCardStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    easeFactor?: boolean
    interval?: boolean
    repetitions?: boolean
    lapses?: boolean
    dueAt?: boolean
    lastReviewedAt?: boolean
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    reviews?: boolean | UserCardState$reviewsArgs<ExtArgs>
    _count?: boolean | UserCardStateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCardState"]>

  export type UserCardStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    easeFactor?: boolean
    interval?: boolean
    repetitions?: boolean
    lapses?: boolean
    dueAt?: boolean
    lastReviewedAt?: boolean
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCardState"]>

  export type UserCardStateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    easeFactor?: boolean
    interval?: boolean
    repetitions?: boolean
    lapses?: boolean
    dueAt?: boolean
    lastReviewedAt?: boolean
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCardState"]>

  export type UserCardStateSelectScalar = {
    id?: boolean
    userId?: boolean
    cardId?: boolean
    easeFactor?: boolean
    interval?: boolean
    repetitions?: boolean
    lapses?: boolean
    dueAt?: boolean
    lastReviewedAt?: boolean
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserCardStateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "cardId" | "easeFactor" | "interval" | "repetitions" | "lapses" | "dueAt" | "lastReviewedAt" | "isForwardLearned" | "isReverseLearned" | "isMastered" | "suspendedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userCardState"]>
  export type UserCardStateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    reviews?: boolean | UserCardState$reviewsArgs<ExtArgs>
    _count?: boolean | UserCardStateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserCardStateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
  }
  export type UserCardStateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
  }

  export type $UserCardStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCardState"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      card: Prisma.$CardPayload<ExtArgs>
      reviews: Prisma.$ReviewLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      cardId: string
      easeFactor: number
      interval: number
      repetitions: number
      lapses: number
      dueAt: Date
      lastReviewedAt: Date | null
      isForwardLearned: boolean
      isReverseLearned: boolean
      isMastered: boolean
      suspendedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userCardState"]>
    composites: {}
  }

  type UserCardStateGetPayload<S extends boolean | null | undefined | UserCardStateDefaultArgs> = $Result.GetResult<Prisma.$UserCardStatePayload, S>

  type UserCardStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCardStateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCardStateCountAggregateInputType | true
    }

  export interface UserCardStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCardState'], meta: { name: 'UserCardState' } }
    /**
     * Find zero or one UserCardState that matches the filter.
     * @param {UserCardStateFindUniqueArgs} args - Arguments to find a UserCardState
     * @example
     * // Get one UserCardState
     * const userCardState = await prisma.userCardState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCardStateFindUniqueArgs>(args: SelectSubset<T, UserCardStateFindUniqueArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCardState that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCardStateFindUniqueOrThrowArgs} args - Arguments to find a UserCardState
     * @example
     * // Get one UserCardState
     * const userCardState = await prisma.userCardState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCardStateFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCardStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCardState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateFindFirstArgs} args - Arguments to find a UserCardState
     * @example
     * // Get one UserCardState
     * const userCardState = await prisma.userCardState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCardStateFindFirstArgs>(args?: SelectSubset<T, UserCardStateFindFirstArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCardState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateFindFirstOrThrowArgs} args - Arguments to find a UserCardState
     * @example
     * // Get one UserCardState
     * const userCardState = await prisma.userCardState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCardStateFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCardStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCardStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCardStates
     * const userCardStates = await prisma.userCardState.findMany()
     * 
     * // Get first 10 UserCardStates
     * const userCardStates = await prisma.userCardState.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCardStateWithIdOnly = await prisma.userCardState.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCardStateFindManyArgs>(args?: SelectSubset<T, UserCardStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCardState.
     * @param {UserCardStateCreateArgs} args - Arguments to create a UserCardState.
     * @example
     * // Create one UserCardState
     * const UserCardState = await prisma.userCardState.create({
     *   data: {
     *     // ... data to create a UserCardState
     *   }
     * })
     * 
     */
    create<T extends UserCardStateCreateArgs>(args: SelectSubset<T, UserCardStateCreateArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCardStates.
     * @param {UserCardStateCreateManyArgs} args - Arguments to create many UserCardStates.
     * @example
     * // Create many UserCardStates
     * const userCardState = await prisma.userCardState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCardStateCreateManyArgs>(args?: SelectSubset<T, UserCardStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCardStates and returns the data saved in the database.
     * @param {UserCardStateCreateManyAndReturnArgs} args - Arguments to create many UserCardStates.
     * @example
     * // Create many UserCardStates
     * const userCardState = await prisma.userCardState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCardStates and only return the `id`
     * const userCardStateWithIdOnly = await prisma.userCardState.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCardStateCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCardStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCardState.
     * @param {UserCardStateDeleteArgs} args - Arguments to delete one UserCardState.
     * @example
     * // Delete one UserCardState
     * const UserCardState = await prisma.userCardState.delete({
     *   where: {
     *     // ... filter to delete one UserCardState
     *   }
     * })
     * 
     */
    delete<T extends UserCardStateDeleteArgs>(args: SelectSubset<T, UserCardStateDeleteArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCardState.
     * @param {UserCardStateUpdateArgs} args - Arguments to update one UserCardState.
     * @example
     * // Update one UserCardState
     * const userCardState = await prisma.userCardState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCardStateUpdateArgs>(args: SelectSubset<T, UserCardStateUpdateArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCardStates.
     * @param {UserCardStateDeleteManyArgs} args - Arguments to filter UserCardStates to delete.
     * @example
     * // Delete a few UserCardStates
     * const { count } = await prisma.userCardState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCardStateDeleteManyArgs>(args?: SelectSubset<T, UserCardStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCardStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCardStates
     * const userCardState = await prisma.userCardState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCardStateUpdateManyArgs>(args: SelectSubset<T, UserCardStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCardStates and returns the data updated in the database.
     * @param {UserCardStateUpdateManyAndReturnArgs} args - Arguments to update many UserCardStates.
     * @example
     * // Update many UserCardStates
     * const userCardState = await prisma.userCardState.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCardStates and only return the `id`
     * const userCardStateWithIdOnly = await prisma.userCardState.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserCardStateUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCardStateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCardState.
     * @param {UserCardStateUpsertArgs} args - Arguments to update or create a UserCardState.
     * @example
     * // Update or create a UserCardState
     * const userCardState = await prisma.userCardState.upsert({
     *   create: {
     *     // ... data to create a UserCardState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCardState we want to update
     *   }
     * })
     */
    upsert<T extends UserCardStateUpsertArgs>(args: SelectSubset<T, UserCardStateUpsertArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCardStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateCountArgs} args - Arguments to filter UserCardStates to count.
     * @example
     * // Count the number of UserCardStates
     * const count = await prisma.userCardState.count({
     *   where: {
     *     // ... the filter for the UserCardStates we want to count
     *   }
     * })
    **/
    count<T extends UserCardStateCountArgs>(
      args?: Subset<T, UserCardStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCardStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCardState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCardStateAggregateArgs>(args: Subset<T, UserCardStateAggregateArgs>): Prisma.PrismaPromise<GetUserCardStateAggregateType<T>>

    /**
     * Group by UserCardState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCardStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCardStateGroupByArgs['orderBy'] }
        : { orderBy?: UserCardStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCardStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCardStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCardState model
   */
  readonly fields: UserCardStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCardState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCardStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    card<T extends CardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardDefaultArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviews<T extends UserCardState$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, UserCardState$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCardState model
   */
  interface UserCardStateFieldRefs {
    readonly id: FieldRef<"UserCardState", 'String'>
    readonly userId: FieldRef<"UserCardState", 'String'>
    readonly cardId: FieldRef<"UserCardState", 'String'>
    readonly easeFactor: FieldRef<"UserCardState", 'Float'>
    readonly interval: FieldRef<"UserCardState", 'Int'>
    readonly repetitions: FieldRef<"UserCardState", 'Int'>
    readonly lapses: FieldRef<"UserCardState", 'Int'>
    readonly dueAt: FieldRef<"UserCardState", 'DateTime'>
    readonly lastReviewedAt: FieldRef<"UserCardState", 'DateTime'>
    readonly isForwardLearned: FieldRef<"UserCardState", 'Boolean'>
    readonly isReverseLearned: FieldRef<"UserCardState", 'Boolean'>
    readonly isMastered: FieldRef<"UserCardState", 'Boolean'>
    readonly suspendedAt: FieldRef<"UserCardState", 'DateTime'>
    readonly createdAt: FieldRef<"UserCardState", 'DateTime'>
    readonly updatedAt: FieldRef<"UserCardState", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCardState findUnique
   */
  export type UserCardStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * Filter, which UserCardState to fetch.
     */
    where: UserCardStateWhereUniqueInput
  }

  /**
   * UserCardState findUniqueOrThrow
   */
  export type UserCardStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * Filter, which UserCardState to fetch.
     */
    where: UserCardStateWhereUniqueInput
  }

  /**
   * UserCardState findFirst
   */
  export type UserCardStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * Filter, which UserCardState to fetch.
     */
    where?: UserCardStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCardStates to fetch.
     */
    orderBy?: UserCardStateOrderByWithRelationInput | UserCardStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCardStates.
     */
    cursor?: UserCardStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCardStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCardStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCardStates.
     */
    distinct?: UserCardStateScalarFieldEnum | UserCardStateScalarFieldEnum[]
  }

  /**
   * UserCardState findFirstOrThrow
   */
  export type UserCardStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * Filter, which UserCardState to fetch.
     */
    where?: UserCardStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCardStates to fetch.
     */
    orderBy?: UserCardStateOrderByWithRelationInput | UserCardStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCardStates.
     */
    cursor?: UserCardStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCardStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCardStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCardStates.
     */
    distinct?: UserCardStateScalarFieldEnum | UserCardStateScalarFieldEnum[]
  }

  /**
   * UserCardState findMany
   */
  export type UserCardStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * Filter, which UserCardStates to fetch.
     */
    where?: UserCardStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCardStates to fetch.
     */
    orderBy?: UserCardStateOrderByWithRelationInput | UserCardStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCardStates.
     */
    cursor?: UserCardStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCardStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCardStates.
     */
    skip?: number
    distinct?: UserCardStateScalarFieldEnum | UserCardStateScalarFieldEnum[]
  }

  /**
   * UserCardState create
   */
  export type UserCardStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCardState.
     */
    data: XOR<UserCardStateCreateInput, UserCardStateUncheckedCreateInput>
  }

  /**
   * UserCardState createMany
   */
  export type UserCardStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCardStates.
     */
    data: UserCardStateCreateManyInput | UserCardStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCardState createManyAndReturn
   */
  export type UserCardStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * The data used to create many UserCardStates.
     */
    data: UserCardStateCreateManyInput | UserCardStateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCardState update
   */
  export type UserCardStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCardState.
     */
    data: XOR<UserCardStateUpdateInput, UserCardStateUncheckedUpdateInput>
    /**
     * Choose, which UserCardState to update.
     */
    where: UserCardStateWhereUniqueInput
  }

  /**
   * UserCardState updateMany
   */
  export type UserCardStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCardStates.
     */
    data: XOR<UserCardStateUpdateManyMutationInput, UserCardStateUncheckedUpdateManyInput>
    /**
     * Filter which UserCardStates to update
     */
    where?: UserCardStateWhereInput
    /**
     * Limit how many UserCardStates to update.
     */
    limit?: number
  }

  /**
   * UserCardState updateManyAndReturn
   */
  export type UserCardStateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * The data used to update UserCardStates.
     */
    data: XOR<UserCardStateUpdateManyMutationInput, UserCardStateUncheckedUpdateManyInput>
    /**
     * Filter which UserCardStates to update
     */
    where?: UserCardStateWhereInput
    /**
     * Limit how many UserCardStates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCardState upsert
   */
  export type UserCardStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCardState to update in case it exists.
     */
    where: UserCardStateWhereUniqueInput
    /**
     * In case the UserCardState found by the `where` argument doesn't exist, create a new UserCardState with this data.
     */
    create: XOR<UserCardStateCreateInput, UserCardStateUncheckedCreateInput>
    /**
     * In case the UserCardState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCardStateUpdateInput, UserCardStateUncheckedUpdateInput>
  }

  /**
   * UserCardState delete
   */
  export type UserCardStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
    /**
     * Filter which UserCardState to delete.
     */
    where: UserCardStateWhereUniqueInput
  }

  /**
   * UserCardState deleteMany
   */
  export type UserCardStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCardStates to delete
     */
    where?: UserCardStateWhereInput
    /**
     * Limit how many UserCardStates to delete.
     */
    limit?: number
  }

  /**
   * UserCardState.reviews
   */
  export type UserCardState$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    cursor?: ReviewLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * UserCardState without action
   */
  export type UserCardStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCardState
     */
    select?: UserCardStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCardState
     */
    omit?: UserCardStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardStateInclude<ExtArgs> | null
  }


  /**
   * Model ReviewLog
   */

  export type AggregateReviewLog = {
    _count: ReviewLogCountAggregateOutputType | null
    _avg: ReviewLogAvgAggregateOutputType | null
    _sum: ReviewLogSumAggregateOutputType | null
    _min: ReviewLogMinAggregateOutputType | null
    _max: ReviewLogMaxAggregateOutputType | null
  }

  export type ReviewLogAvgAggregateOutputType = {
    grade: number | null
    responseTime: number | null
  }

  export type ReviewLogSumAggregateOutputType = {
    grade: number | null
    responseTime: number | null
  }

  export type ReviewLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    cardId: string | null
    userCardStateId: string | null
    direction: string | null
    grade: number | null
    responseTime: number | null
    scheduledBefore: Date | null
    scheduledAfter: Date | null
    createdAt: Date | null
  }

  export type ReviewLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    cardId: string | null
    userCardStateId: string | null
    direction: string | null
    grade: number | null
    responseTime: number | null
    scheduledBefore: Date | null
    scheduledAfter: Date | null
    createdAt: Date | null
  }

  export type ReviewLogCountAggregateOutputType = {
    id: number
    userId: number
    cardId: number
    userCardStateId: number
    direction: number
    grade: number
    responseTime: number
    scheduledBefore: number
    scheduledAfter: number
    createdAt: number
    _all: number
  }


  export type ReviewLogAvgAggregateInputType = {
    grade?: true
    responseTime?: true
  }

  export type ReviewLogSumAggregateInputType = {
    grade?: true
    responseTime?: true
  }

  export type ReviewLogMinAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    userCardStateId?: true
    direction?: true
    grade?: true
    responseTime?: true
    scheduledBefore?: true
    scheduledAfter?: true
    createdAt?: true
  }

  export type ReviewLogMaxAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    userCardStateId?: true
    direction?: true
    grade?: true
    responseTime?: true
    scheduledBefore?: true
    scheduledAfter?: true
    createdAt?: true
  }

  export type ReviewLogCountAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    userCardStateId?: true
    direction?: true
    grade?: true
    responseTime?: true
    scheduledBefore?: true
    scheduledAfter?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewLog to aggregate.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReviewLogs
    **/
    _count?: true | ReviewLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewLogMaxAggregateInputType
  }

  export type GetReviewLogAggregateType<T extends ReviewLogAggregateArgs> = {
        [P in keyof T & keyof AggregateReviewLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviewLog[P]>
      : GetScalarType<T[P], AggregateReviewLog[P]>
  }




  export type ReviewLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithAggregationInput | ReviewLogOrderByWithAggregationInput[]
    by: ReviewLogScalarFieldEnum[] | ReviewLogScalarFieldEnum
    having?: ReviewLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewLogCountAggregateInputType | true
    _avg?: ReviewLogAvgAggregateInputType
    _sum?: ReviewLogSumAggregateInputType
    _min?: ReviewLogMinAggregateInputType
    _max?: ReviewLogMaxAggregateInputType
  }

  export type ReviewLogGroupByOutputType = {
    id: string
    userId: string
    cardId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime: number | null
    scheduledBefore: Date
    scheduledAfter: Date
    createdAt: Date
    _count: ReviewLogCountAggregateOutputType | null
    _avg: ReviewLogAvgAggregateOutputType | null
    _sum: ReviewLogSumAggregateOutputType | null
    _min: ReviewLogMinAggregateOutputType | null
    _max: ReviewLogMaxAggregateOutputType | null
  }

  type GetReviewLogGroupByPayload<T extends ReviewLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewLogGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewLogGroupByOutputType[P]>
        }
      >
    >


  export type ReviewLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    userCardStateId?: boolean
    direction?: boolean
    grade?: boolean
    responseTime?: boolean
    scheduledBefore?: boolean
    scheduledAfter?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    userCardState?: boolean | UserCardStateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewLog"]>

  export type ReviewLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    userCardStateId?: boolean
    direction?: boolean
    grade?: boolean
    responseTime?: boolean
    scheduledBefore?: boolean
    scheduledAfter?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    userCardState?: boolean | UserCardStateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewLog"]>

  export type ReviewLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    userCardStateId?: boolean
    direction?: boolean
    grade?: boolean
    responseTime?: boolean
    scheduledBefore?: boolean
    scheduledAfter?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    userCardState?: boolean | UserCardStateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewLog"]>

  export type ReviewLogSelectScalar = {
    id?: boolean
    userId?: boolean
    cardId?: boolean
    userCardStateId?: boolean
    direction?: boolean
    grade?: boolean
    responseTime?: boolean
    scheduledBefore?: boolean
    scheduledAfter?: boolean
    createdAt?: boolean
  }

  export type ReviewLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "cardId" | "userCardStateId" | "direction" | "grade" | "responseTime" | "scheduledBefore" | "scheduledAfter" | "createdAt", ExtArgs["result"]["reviewLog"]>
  export type ReviewLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    userCardState?: boolean | UserCardStateDefaultArgs<ExtArgs>
  }
  export type ReviewLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    userCardState?: boolean | UserCardStateDefaultArgs<ExtArgs>
  }
  export type ReviewLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card?: boolean | CardDefaultArgs<ExtArgs>
    userCardState?: boolean | UserCardStateDefaultArgs<ExtArgs>
  }

  export type $ReviewLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReviewLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      card: Prisma.$CardPayload<ExtArgs>
      userCardState: Prisma.$UserCardStatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      cardId: string
      userCardStateId: string
      direction: string
      grade: number
      responseTime: number | null
      scheduledBefore: Date
      scheduledAfter: Date
      createdAt: Date
    }, ExtArgs["result"]["reviewLog"]>
    composites: {}
  }

  type ReviewLogGetPayload<S extends boolean | null | undefined | ReviewLogDefaultArgs> = $Result.GetResult<Prisma.$ReviewLogPayload, S>

  type ReviewLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewLogCountAggregateInputType | true
    }

  export interface ReviewLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReviewLog'], meta: { name: 'ReviewLog' } }
    /**
     * Find zero or one ReviewLog that matches the filter.
     * @param {ReviewLogFindUniqueArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewLogFindUniqueArgs>(args: SelectSubset<T, ReviewLogFindUniqueArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReviewLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewLogFindUniqueOrThrowArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReviewLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogFindFirstArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewLogFindFirstArgs>(args?: SelectSubset<T, ReviewLogFindFirstArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReviewLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogFindFirstOrThrowArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReviewLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReviewLogs
     * const reviewLogs = await prisma.reviewLog.findMany()
     * 
     * // Get first 10 ReviewLogs
     * const reviewLogs = await prisma.reviewLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewLogWithIdOnly = await prisma.reviewLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewLogFindManyArgs>(args?: SelectSubset<T, ReviewLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReviewLog.
     * @param {ReviewLogCreateArgs} args - Arguments to create a ReviewLog.
     * @example
     * // Create one ReviewLog
     * const ReviewLog = await prisma.reviewLog.create({
     *   data: {
     *     // ... data to create a ReviewLog
     *   }
     * })
     * 
     */
    create<T extends ReviewLogCreateArgs>(args: SelectSubset<T, ReviewLogCreateArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReviewLogs.
     * @param {ReviewLogCreateManyArgs} args - Arguments to create many ReviewLogs.
     * @example
     * // Create many ReviewLogs
     * const reviewLog = await prisma.reviewLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewLogCreateManyArgs>(args?: SelectSubset<T, ReviewLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReviewLogs and returns the data saved in the database.
     * @param {ReviewLogCreateManyAndReturnArgs} args - Arguments to create many ReviewLogs.
     * @example
     * // Create many ReviewLogs
     * const reviewLog = await prisma.reviewLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReviewLogs and only return the `id`
     * const reviewLogWithIdOnly = await prisma.reviewLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReviewLog.
     * @param {ReviewLogDeleteArgs} args - Arguments to delete one ReviewLog.
     * @example
     * // Delete one ReviewLog
     * const ReviewLog = await prisma.reviewLog.delete({
     *   where: {
     *     // ... filter to delete one ReviewLog
     *   }
     * })
     * 
     */
    delete<T extends ReviewLogDeleteArgs>(args: SelectSubset<T, ReviewLogDeleteArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReviewLog.
     * @param {ReviewLogUpdateArgs} args - Arguments to update one ReviewLog.
     * @example
     * // Update one ReviewLog
     * const reviewLog = await prisma.reviewLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewLogUpdateArgs>(args: SelectSubset<T, ReviewLogUpdateArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReviewLogs.
     * @param {ReviewLogDeleteManyArgs} args - Arguments to filter ReviewLogs to delete.
     * @example
     * // Delete a few ReviewLogs
     * const { count } = await prisma.reviewLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewLogDeleteManyArgs>(args?: SelectSubset<T, ReviewLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReviewLogs
     * const reviewLog = await prisma.reviewLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewLogUpdateManyArgs>(args: SelectSubset<T, ReviewLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewLogs and returns the data updated in the database.
     * @param {ReviewLogUpdateManyAndReturnArgs} args - Arguments to update many ReviewLogs.
     * @example
     * // Update many ReviewLogs
     * const reviewLog = await prisma.reviewLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReviewLogs and only return the `id`
     * const reviewLogWithIdOnly = await prisma.reviewLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReviewLog.
     * @param {ReviewLogUpsertArgs} args - Arguments to update or create a ReviewLog.
     * @example
     * // Update or create a ReviewLog
     * const reviewLog = await prisma.reviewLog.upsert({
     *   create: {
     *     // ... data to create a ReviewLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReviewLog we want to update
     *   }
     * })
     */
    upsert<T extends ReviewLogUpsertArgs>(args: SelectSubset<T, ReviewLogUpsertArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReviewLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogCountArgs} args - Arguments to filter ReviewLogs to count.
     * @example
     * // Count the number of ReviewLogs
     * const count = await prisma.reviewLog.count({
     *   where: {
     *     // ... the filter for the ReviewLogs we want to count
     *   }
     * })
    **/
    count<T extends ReviewLogCountArgs>(
      args?: Subset<T, ReviewLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReviewLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewLogAggregateArgs>(args: Subset<T, ReviewLogAggregateArgs>): Prisma.PrismaPromise<GetReviewLogAggregateType<T>>

    /**
     * Group by ReviewLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewLogGroupByArgs['orderBy'] }
        : { orderBy?: ReviewLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReviewLog model
   */
  readonly fields: ReviewLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReviewLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    card<T extends CardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardDefaultArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userCardState<T extends UserCardStateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserCardStateDefaultArgs<ExtArgs>>): Prisma__UserCardStateClient<$Result.GetResult<Prisma.$UserCardStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReviewLog model
   */
  interface ReviewLogFieldRefs {
    readonly id: FieldRef<"ReviewLog", 'String'>
    readonly userId: FieldRef<"ReviewLog", 'String'>
    readonly cardId: FieldRef<"ReviewLog", 'String'>
    readonly userCardStateId: FieldRef<"ReviewLog", 'String'>
    readonly direction: FieldRef<"ReviewLog", 'String'>
    readonly grade: FieldRef<"ReviewLog", 'Int'>
    readonly responseTime: FieldRef<"ReviewLog", 'Int'>
    readonly scheduledBefore: FieldRef<"ReviewLog", 'DateTime'>
    readonly scheduledAfter: FieldRef<"ReviewLog", 'DateTime'>
    readonly createdAt: FieldRef<"ReviewLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReviewLog findUnique
   */
  export type ReviewLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog findUniqueOrThrow
   */
  export type ReviewLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog findFirst
   */
  export type ReviewLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewLogs.
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewLogs.
     */
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * ReviewLog findFirstOrThrow
   */
  export type ReviewLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewLogs.
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewLogs.
     */
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * ReviewLog findMany
   */
  export type ReviewLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLogs to fetch.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReviewLogs.
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * ReviewLog create
   */
  export type ReviewLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ReviewLog.
     */
    data: XOR<ReviewLogCreateInput, ReviewLogUncheckedCreateInput>
  }

  /**
   * ReviewLog createMany
   */
  export type ReviewLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReviewLogs.
     */
    data: ReviewLogCreateManyInput | ReviewLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReviewLog createManyAndReturn
   */
  export type ReviewLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * The data used to create many ReviewLogs.
     */
    data: ReviewLogCreateManyInput | ReviewLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReviewLog update
   */
  export type ReviewLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ReviewLog.
     */
    data: XOR<ReviewLogUpdateInput, ReviewLogUncheckedUpdateInput>
    /**
     * Choose, which ReviewLog to update.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog updateMany
   */
  export type ReviewLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReviewLogs.
     */
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyInput>
    /**
     * Filter which ReviewLogs to update
     */
    where?: ReviewLogWhereInput
    /**
     * Limit how many ReviewLogs to update.
     */
    limit?: number
  }

  /**
   * ReviewLog updateManyAndReturn
   */
  export type ReviewLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * The data used to update ReviewLogs.
     */
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyInput>
    /**
     * Filter which ReviewLogs to update
     */
    where?: ReviewLogWhereInput
    /**
     * Limit how many ReviewLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReviewLog upsert
   */
  export type ReviewLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ReviewLog to update in case it exists.
     */
    where: ReviewLogWhereUniqueInput
    /**
     * In case the ReviewLog found by the `where` argument doesn't exist, create a new ReviewLog with this data.
     */
    create: XOR<ReviewLogCreateInput, ReviewLogUncheckedCreateInput>
    /**
     * In case the ReviewLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewLogUpdateInput, ReviewLogUncheckedUpdateInput>
  }

  /**
   * ReviewLog delete
   */
  export type ReviewLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter which ReviewLog to delete.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog deleteMany
   */
  export type ReviewLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewLogs to delete
     */
    where?: ReviewLogWhereInput
    /**
     * Limit how many ReviewLogs to delete.
     */
    limit?: number
  }

  /**
   * ReviewLog without action
   */
  export type ReviewLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewLog
     */
    omit?: ReviewLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
  }


  /**
   * Model ImportJob
   */

  export type AggregateImportJob = {
    _count: ImportJobCountAggregateOutputType | null
    _avg: ImportJobAvgAggregateOutputType | null
    _sum: ImportJobSumAggregateOutputType | null
    _min: ImportJobMinAggregateOutputType | null
    _max: ImportJobMaxAggregateOutputType | null
  }

  export type ImportJobAvgAggregateOutputType = {
    rowsParsed: number | null
    rowsInserted: number | null
    rowsUpdated: number | null
    rowsSkipped: number | null
  }

  export type ImportJobSumAggregateOutputType = {
    rowsParsed: number | null
    rowsInserted: number | null
    rowsUpdated: number | null
    rowsSkipped: number | null
  }

  export type ImportJobMinAggregateOutputType = {
    id: string | null
    deckId: string | null
    mode: string | null
    fileName: string | null
    fileHash: string | null
    rowsParsed: number | null
    rowsInserted: number | null
    rowsUpdated: number | null
    rowsSkipped: number | null
    errors: string | null
    appliedAt: Date | null
  }

  export type ImportJobMaxAggregateOutputType = {
    id: string | null
    deckId: string | null
    mode: string | null
    fileName: string | null
    fileHash: string | null
    rowsParsed: number | null
    rowsInserted: number | null
    rowsUpdated: number | null
    rowsSkipped: number | null
    errors: string | null
    appliedAt: Date | null
  }

  export type ImportJobCountAggregateOutputType = {
    id: number
    deckId: number
    mode: number
    fileName: number
    fileHash: number
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors: number
    appliedAt: number
    _all: number
  }


  export type ImportJobAvgAggregateInputType = {
    rowsParsed?: true
    rowsInserted?: true
    rowsUpdated?: true
    rowsSkipped?: true
  }

  export type ImportJobSumAggregateInputType = {
    rowsParsed?: true
    rowsInserted?: true
    rowsUpdated?: true
    rowsSkipped?: true
  }

  export type ImportJobMinAggregateInputType = {
    id?: true
    deckId?: true
    mode?: true
    fileName?: true
    fileHash?: true
    rowsParsed?: true
    rowsInserted?: true
    rowsUpdated?: true
    rowsSkipped?: true
    errors?: true
    appliedAt?: true
  }

  export type ImportJobMaxAggregateInputType = {
    id?: true
    deckId?: true
    mode?: true
    fileName?: true
    fileHash?: true
    rowsParsed?: true
    rowsInserted?: true
    rowsUpdated?: true
    rowsSkipped?: true
    errors?: true
    appliedAt?: true
  }

  export type ImportJobCountAggregateInputType = {
    id?: true
    deckId?: true
    mode?: true
    fileName?: true
    fileHash?: true
    rowsParsed?: true
    rowsInserted?: true
    rowsUpdated?: true
    rowsSkipped?: true
    errors?: true
    appliedAt?: true
    _all?: true
  }

  export type ImportJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportJob to aggregate.
     */
    where?: ImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportJobs to fetch.
     */
    orderBy?: ImportJobOrderByWithRelationInput | ImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImportJobs
    **/
    _count?: true | ImportJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImportJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImportJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportJobMaxAggregateInputType
  }

  export type GetImportJobAggregateType<T extends ImportJobAggregateArgs> = {
        [P in keyof T & keyof AggregateImportJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportJob[P]>
      : GetScalarType<T[P], AggregateImportJob[P]>
  }




  export type ImportJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportJobWhereInput
    orderBy?: ImportJobOrderByWithAggregationInput | ImportJobOrderByWithAggregationInput[]
    by: ImportJobScalarFieldEnum[] | ImportJobScalarFieldEnum
    having?: ImportJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportJobCountAggregateInputType | true
    _avg?: ImportJobAvgAggregateInputType
    _sum?: ImportJobSumAggregateInputType
    _min?: ImportJobMinAggregateInputType
    _max?: ImportJobMaxAggregateInputType
  }

  export type ImportJobGroupByOutputType = {
    id: string
    deckId: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors: string | null
    appliedAt: Date
    _count: ImportJobCountAggregateOutputType | null
    _avg: ImportJobAvgAggregateOutputType | null
    _sum: ImportJobSumAggregateOutputType | null
    _min: ImportJobMinAggregateOutputType | null
    _max: ImportJobMaxAggregateOutputType | null
  }

  type GetImportJobGroupByPayload<T extends ImportJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportJobGroupByOutputType[P]>
            : GetScalarType<T[P], ImportJobGroupByOutputType[P]>
        }
      >
    >


  export type ImportJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deckId?: boolean
    mode?: boolean
    fileName?: boolean
    fileHash?: boolean
    rowsParsed?: boolean
    rowsInserted?: boolean
    rowsUpdated?: boolean
    rowsSkipped?: boolean
    errors?: boolean
    appliedAt?: boolean
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importJob"]>

  export type ImportJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deckId?: boolean
    mode?: boolean
    fileName?: boolean
    fileHash?: boolean
    rowsParsed?: boolean
    rowsInserted?: boolean
    rowsUpdated?: boolean
    rowsSkipped?: boolean
    errors?: boolean
    appliedAt?: boolean
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importJob"]>

  export type ImportJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deckId?: boolean
    mode?: boolean
    fileName?: boolean
    fileHash?: boolean
    rowsParsed?: boolean
    rowsInserted?: boolean
    rowsUpdated?: boolean
    rowsSkipped?: boolean
    errors?: boolean
    appliedAt?: boolean
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importJob"]>

  export type ImportJobSelectScalar = {
    id?: boolean
    deckId?: boolean
    mode?: boolean
    fileName?: boolean
    fileHash?: boolean
    rowsParsed?: boolean
    rowsInserted?: boolean
    rowsUpdated?: boolean
    rowsSkipped?: boolean
    errors?: boolean
    appliedAt?: boolean
  }

  export type ImportJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deckId" | "mode" | "fileName" | "fileHash" | "rowsParsed" | "rowsInserted" | "rowsUpdated" | "rowsSkipped" | "errors" | "appliedAt", ExtArgs["result"]["importJob"]>
  export type ImportJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }
  export type ImportJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }
  export type ImportJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }

  export type $ImportJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImportJob"
    objects: {
      deck: Prisma.$DeckPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deckId: string
      mode: string
      fileName: string
      fileHash: string
      rowsParsed: number
      rowsInserted: number
      rowsUpdated: number
      rowsSkipped: number
      errors: string | null
      appliedAt: Date
    }, ExtArgs["result"]["importJob"]>
    composites: {}
  }

  type ImportJobGetPayload<S extends boolean | null | undefined | ImportJobDefaultArgs> = $Result.GetResult<Prisma.$ImportJobPayload, S>

  type ImportJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportJobCountAggregateInputType | true
    }

  export interface ImportJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportJob'], meta: { name: 'ImportJob' } }
    /**
     * Find zero or one ImportJob that matches the filter.
     * @param {ImportJobFindUniqueArgs} args - Arguments to find a ImportJob
     * @example
     * // Get one ImportJob
     * const importJob = await prisma.importJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportJobFindUniqueArgs>(args: SelectSubset<T, ImportJobFindUniqueArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImportJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportJobFindUniqueOrThrowArgs} args - Arguments to find a ImportJob
     * @example
     * // Get one ImportJob
     * const importJob = await prisma.importJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportJobFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobFindFirstArgs} args - Arguments to find a ImportJob
     * @example
     * // Get one ImportJob
     * const importJob = await prisma.importJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportJobFindFirstArgs>(args?: SelectSubset<T, ImportJobFindFirstArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobFindFirstOrThrowArgs} args - Arguments to find a ImportJob
     * @example
     * // Get one ImportJob
     * const importJob = await prisma.importJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportJobFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImportJobs
     * const importJobs = await prisma.importJob.findMany()
     * 
     * // Get first 10 ImportJobs
     * const importJobs = await prisma.importJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const importJobWithIdOnly = await prisma.importJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImportJobFindManyArgs>(args?: SelectSubset<T, ImportJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImportJob.
     * @param {ImportJobCreateArgs} args - Arguments to create a ImportJob.
     * @example
     * // Create one ImportJob
     * const ImportJob = await prisma.importJob.create({
     *   data: {
     *     // ... data to create a ImportJob
     *   }
     * })
     * 
     */
    create<T extends ImportJobCreateArgs>(args: SelectSubset<T, ImportJobCreateArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImportJobs.
     * @param {ImportJobCreateManyArgs} args - Arguments to create many ImportJobs.
     * @example
     * // Create many ImportJobs
     * const importJob = await prisma.importJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportJobCreateManyArgs>(args?: SelectSubset<T, ImportJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImportJobs and returns the data saved in the database.
     * @param {ImportJobCreateManyAndReturnArgs} args - Arguments to create many ImportJobs.
     * @example
     * // Create many ImportJobs
     * const importJob = await prisma.importJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImportJobs and only return the `id`
     * const importJobWithIdOnly = await prisma.importJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImportJobCreateManyAndReturnArgs>(args?: SelectSubset<T, ImportJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImportJob.
     * @param {ImportJobDeleteArgs} args - Arguments to delete one ImportJob.
     * @example
     * // Delete one ImportJob
     * const ImportJob = await prisma.importJob.delete({
     *   where: {
     *     // ... filter to delete one ImportJob
     *   }
     * })
     * 
     */
    delete<T extends ImportJobDeleteArgs>(args: SelectSubset<T, ImportJobDeleteArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImportJob.
     * @param {ImportJobUpdateArgs} args - Arguments to update one ImportJob.
     * @example
     * // Update one ImportJob
     * const importJob = await prisma.importJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportJobUpdateArgs>(args: SelectSubset<T, ImportJobUpdateArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImportJobs.
     * @param {ImportJobDeleteManyArgs} args - Arguments to filter ImportJobs to delete.
     * @example
     * // Delete a few ImportJobs
     * const { count } = await prisma.importJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportJobDeleteManyArgs>(args?: SelectSubset<T, ImportJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImportJobs
     * const importJob = await prisma.importJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportJobUpdateManyArgs>(args: SelectSubset<T, ImportJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportJobs and returns the data updated in the database.
     * @param {ImportJobUpdateManyAndReturnArgs} args - Arguments to update many ImportJobs.
     * @example
     * // Update many ImportJobs
     * const importJob = await prisma.importJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImportJobs and only return the `id`
     * const importJobWithIdOnly = await prisma.importJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImportJobUpdateManyAndReturnArgs>(args: SelectSubset<T, ImportJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImportJob.
     * @param {ImportJobUpsertArgs} args - Arguments to update or create a ImportJob.
     * @example
     * // Update or create a ImportJob
     * const importJob = await prisma.importJob.upsert({
     *   create: {
     *     // ... data to create a ImportJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImportJob we want to update
     *   }
     * })
     */
    upsert<T extends ImportJobUpsertArgs>(args: SelectSubset<T, ImportJobUpsertArgs<ExtArgs>>): Prisma__ImportJobClient<$Result.GetResult<Prisma.$ImportJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobCountArgs} args - Arguments to filter ImportJobs to count.
     * @example
     * // Count the number of ImportJobs
     * const count = await prisma.importJob.count({
     *   where: {
     *     // ... the filter for the ImportJobs we want to count
     *   }
     * })
    **/
    count<T extends ImportJobCountArgs>(
      args?: Subset<T, ImportJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImportJobAggregateArgs>(args: Subset<T, ImportJobAggregateArgs>): Prisma.PrismaPromise<GetImportJobAggregateType<T>>

    /**
     * Group by ImportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImportJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportJobGroupByArgs['orderBy'] }
        : { orderBy?: ImportJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImportJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImportJob model
   */
  readonly fields: ImportJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImportJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deck<T extends DeckDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeckDefaultArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImportJob model
   */
  interface ImportJobFieldRefs {
    readonly id: FieldRef<"ImportJob", 'String'>
    readonly deckId: FieldRef<"ImportJob", 'String'>
    readonly mode: FieldRef<"ImportJob", 'String'>
    readonly fileName: FieldRef<"ImportJob", 'String'>
    readonly fileHash: FieldRef<"ImportJob", 'String'>
    readonly rowsParsed: FieldRef<"ImportJob", 'Int'>
    readonly rowsInserted: FieldRef<"ImportJob", 'Int'>
    readonly rowsUpdated: FieldRef<"ImportJob", 'Int'>
    readonly rowsSkipped: FieldRef<"ImportJob", 'Int'>
    readonly errors: FieldRef<"ImportJob", 'String'>
    readonly appliedAt: FieldRef<"ImportJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImportJob findUnique
   */
  export type ImportJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * Filter, which ImportJob to fetch.
     */
    where: ImportJobWhereUniqueInput
  }

  /**
   * ImportJob findUniqueOrThrow
   */
  export type ImportJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * Filter, which ImportJob to fetch.
     */
    where: ImportJobWhereUniqueInput
  }

  /**
   * ImportJob findFirst
   */
  export type ImportJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * Filter, which ImportJob to fetch.
     */
    where?: ImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportJobs to fetch.
     */
    orderBy?: ImportJobOrderByWithRelationInput | ImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportJobs.
     */
    cursor?: ImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportJobs.
     */
    distinct?: ImportJobScalarFieldEnum | ImportJobScalarFieldEnum[]
  }

  /**
   * ImportJob findFirstOrThrow
   */
  export type ImportJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * Filter, which ImportJob to fetch.
     */
    where?: ImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportJobs to fetch.
     */
    orderBy?: ImportJobOrderByWithRelationInput | ImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportJobs.
     */
    cursor?: ImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportJobs.
     */
    distinct?: ImportJobScalarFieldEnum | ImportJobScalarFieldEnum[]
  }

  /**
   * ImportJob findMany
   */
  export type ImportJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * Filter, which ImportJobs to fetch.
     */
    where?: ImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportJobs to fetch.
     */
    orderBy?: ImportJobOrderByWithRelationInput | ImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImportJobs.
     */
    cursor?: ImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportJobs.
     */
    skip?: number
    distinct?: ImportJobScalarFieldEnum | ImportJobScalarFieldEnum[]
  }

  /**
   * ImportJob create
   */
  export type ImportJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * The data needed to create a ImportJob.
     */
    data: XOR<ImportJobCreateInput, ImportJobUncheckedCreateInput>
  }

  /**
   * ImportJob createMany
   */
  export type ImportJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImportJobs.
     */
    data: ImportJobCreateManyInput | ImportJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImportJob createManyAndReturn
   */
  export type ImportJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * The data used to create many ImportJobs.
     */
    data: ImportJobCreateManyInput | ImportJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportJob update
   */
  export type ImportJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * The data needed to update a ImportJob.
     */
    data: XOR<ImportJobUpdateInput, ImportJobUncheckedUpdateInput>
    /**
     * Choose, which ImportJob to update.
     */
    where: ImportJobWhereUniqueInput
  }

  /**
   * ImportJob updateMany
   */
  export type ImportJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImportJobs.
     */
    data: XOR<ImportJobUpdateManyMutationInput, ImportJobUncheckedUpdateManyInput>
    /**
     * Filter which ImportJobs to update
     */
    where?: ImportJobWhereInput
    /**
     * Limit how many ImportJobs to update.
     */
    limit?: number
  }

  /**
   * ImportJob updateManyAndReturn
   */
  export type ImportJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * The data used to update ImportJobs.
     */
    data: XOR<ImportJobUpdateManyMutationInput, ImportJobUncheckedUpdateManyInput>
    /**
     * Filter which ImportJobs to update
     */
    where?: ImportJobWhereInput
    /**
     * Limit how many ImportJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportJob upsert
   */
  export type ImportJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * The filter to search for the ImportJob to update in case it exists.
     */
    where: ImportJobWhereUniqueInput
    /**
     * In case the ImportJob found by the `where` argument doesn't exist, create a new ImportJob with this data.
     */
    create: XOR<ImportJobCreateInput, ImportJobUncheckedCreateInput>
    /**
     * In case the ImportJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportJobUpdateInput, ImportJobUncheckedUpdateInput>
  }

  /**
   * ImportJob delete
   */
  export type ImportJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
    /**
     * Filter which ImportJob to delete.
     */
    where: ImportJobWhereUniqueInput
  }

  /**
   * ImportJob deleteMany
   */
  export type ImportJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportJobs to delete
     */
    where?: ImportJobWhereInput
    /**
     * Limit how many ImportJobs to delete.
     */
    limit?: number
  }

  /**
   * ImportJob without action
   */
  export type ImportJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportJob
     */
    select?: ImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportJob
     */
    omit?: ImportJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportJobInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    emailVerified: 'emailVerified',
    name: 'name',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const DeckScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    title: 'title',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sourceFingerprint: 'sourceFingerprint'
  };

  export type DeckScalarFieldEnum = (typeof DeckScalarFieldEnum)[keyof typeof DeckScalarFieldEnum]


  export const CardScalarFieldEnum: {
    id: 'id',
    deckId: 'deckId',
    externalRowId: 'externalRowId',
    armenianScript: 'armenianScript',
    translit: 'translit',
    englishMeaning: 'englishMeaning',
    exampleSentence: 'exampleSentence',
    exampleTranslation: 'exampleTranslation',
    grammar: 'grammar',
    cheatPhrase: 'cheatPhrase',
    topic: 'topic',
    difficultyBase: 'difficultyBase',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CardScalarFieldEnum = (typeof CardScalarFieldEnum)[keyof typeof CardScalarFieldEnum]


  export const UserCardStateScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cardId: 'cardId',
    easeFactor: 'easeFactor',
    interval: 'interval',
    repetitions: 'repetitions',
    lapses: 'lapses',
    dueAt: 'dueAt',
    lastReviewedAt: 'lastReviewedAt',
    isForwardLearned: 'isForwardLearned',
    isReverseLearned: 'isReverseLearned',
    isMastered: 'isMastered',
    suspendedAt: 'suspendedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserCardStateScalarFieldEnum = (typeof UserCardStateScalarFieldEnum)[keyof typeof UserCardStateScalarFieldEnum]


  export const ReviewLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cardId: 'cardId',
    userCardStateId: 'userCardStateId',
    direction: 'direction',
    grade: 'grade',
    responseTime: 'responseTime',
    scheduledBefore: 'scheduledBefore',
    scheduledAfter: 'scheduledAfter',
    createdAt: 'createdAt'
  };

  export type ReviewLogScalarFieldEnum = (typeof ReviewLogScalarFieldEnum)[keyof typeof ReviewLogScalarFieldEnum]


  export const ImportJobScalarFieldEnum: {
    id: 'id',
    deckId: 'deckId',
    mode: 'mode',
    fileName: 'fileName',
    fileHash: 'fileHash',
    rowsParsed: 'rowsParsed',
    rowsInserted: 'rowsInserted',
    rowsUpdated: 'rowsUpdated',
    rowsSkipped: 'rowsSkipped',
    errors: 'errors',
    appliedAt: 'appliedAt'
  };

  export type ImportJobScalarFieldEnum = (typeof ImportJobScalarFieldEnum)[keyof typeof ImportJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    decks?: DeckListRelationFilter
    cardStates?: UserCardStateListRelationFilter
    reviewLogs?: ReviewLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    decks?: DeckOrderByRelationAggregateInput
    cardStates?: UserCardStateOrderByRelationAggregateInput
    reviewLogs?: ReviewLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    decks?: DeckListRelationFilter
    cardStates?: UserCardStateListRelationFilter
    reviewLogs?: ReviewLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type DeckWhereInput = {
    AND?: DeckWhereInput | DeckWhereInput[]
    OR?: DeckWhereInput[]
    NOT?: DeckWhereInput | DeckWhereInput[]
    id?: StringFilter<"Deck"> | string
    ownerId?: StringFilter<"Deck"> | string
    title?: StringFilter<"Deck"> | string
    slug?: StringFilter<"Deck"> | string
    description?: StringNullableFilter<"Deck"> | string | null
    createdAt?: DateTimeFilter<"Deck"> | Date | string
    updatedAt?: DateTimeFilter<"Deck"> | Date | string
    sourceFingerprint?: StringNullableFilter<"Deck"> | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    cards?: CardListRelationFilter
    imports?: ImportJobListRelationFilter
  }

  export type DeckOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceFingerprint?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    cards?: CardOrderByRelationAggregateInput
    imports?: ImportJobOrderByRelationAggregateInput
  }

  export type DeckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ownerId_slug?: DeckOwnerIdSlugCompoundUniqueInput
    AND?: DeckWhereInput | DeckWhereInput[]
    OR?: DeckWhereInput[]
    NOT?: DeckWhereInput | DeckWhereInput[]
    ownerId?: StringFilter<"Deck"> | string
    title?: StringFilter<"Deck"> | string
    slug?: StringFilter<"Deck"> | string
    description?: StringNullableFilter<"Deck"> | string | null
    createdAt?: DateTimeFilter<"Deck"> | Date | string
    updatedAt?: DateTimeFilter<"Deck"> | Date | string
    sourceFingerprint?: StringNullableFilter<"Deck"> | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    cards?: CardListRelationFilter
    imports?: ImportJobListRelationFilter
  }, "id" | "ownerId_slug">

  export type DeckOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceFingerprint?: SortOrderInput | SortOrder
    _count?: DeckCountOrderByAggregateInput
    _max?: DeckMaxOrderByAggregateInput
    _min?: DeckMinOrderByAggregateInput
  }

  export type DeckScalarWhereWithAggregatesInput = {
    AND?: DeckScalarWhereWithAggregatesInput | DeckScalarWhereWithAggregatesInput[]
    OR?: DeckScalarWhereWithAggregatesInput[]
    NOT?: DeckScalarWhereWithAggregatesInput | DeckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Deck"> | string
    ownerId?: StringWithAggregatesFilter<"Deck"> | string
    title?: StringWithAggregatesFilter<"Deck"> | string
    slug?: StringWithAggregatesFilter<"Deck"> | string
    description?: StringNullableWithAggregatesFilter<"Deck"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Deck"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deck"> | Date | string
    sourceFingerprint?: StringNullableWithAggregatesFilter<"Deck"> | string | null
  }

  export type CardWhereInput = {
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    id?: StringFilter<"Card"> | string
    deckId?: StringFilter<"Card"> | string
    externalRowId?: StringNullableFilter<"Card"> | string | null
    armenianScript?: StringFilter<"Card"> | string
    translit?: StringFilter<"Card"> | string
    englishMeaning?: StringFilter<"Card"> | string
    exampleSentence?: StringNullableFilter<"Card"> | string | null
    exampleTranslation?: StringNullableFilter<"Card"> | string | null
    grammar?: StringNullableFilter<"Card"> | string | null
    cheatPhrase?: StringNullableFilter<"Card"> | string | null
    topic?: StringNullableFilter<"Card"> | string | null
    difficultyBase?: IntNullableFilter<"Card"> | number | null
    isActive?: BoolFilter<"Card"> | boolean
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    deck?: XOR<DeckScalarRelationFilter, DeckWhereInput>
    userStates?: UserCardStateListRelationFilter
    reviews?: ReviewLogListRelationFilter
  }

  export type CardOrderByWithRelationInput = {
    id?: SortOrder
    deckId?: SortOrder
    externalRowId?: SortOrderInput | SortOrder
    armenianScript?: SortOrder
    translit?: SortOrder
    englishMeaning?: SortOrder
    exampleSentence?: SortOrderInput | SortOrder
    exampleTranslation?: SortOrderInput | SortOrder
    grammar?: SortOrderInput | SortOrder
    cheatPhrase?: SortOrderInput | SortOrder
    topic?: SortOrderInput | SortOrder
    difficultyBase?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deck?: DeckOrderByWithRelationInput
    userStates?: UserCardStateOrderByRelationAggregateInput
    reviews?: ReviewLogOrderByRelationAggregateInput
  }

  export type CardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    deckId_externalRowId?: CardDeckIdExternalRowIdCompoundUniqueInput
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    deckId?: StringFilter<"Card"> | string
    externalRowId?: StringNullableFilter<"Card"> | string | null
    armenianScript?: StringFilter<"Card"> | string
    translit?: StringFilter<"Card"> | string
    englishMeaning?: StringFilter<"Card"> | string
    exampleSentence?: StringNullableFilter<"Card"> | string | null
    exampleTranslation?: StringNullableFilter<"Card"> | string | null
    grammar?: StringNullableFilter<"Card"> | string | null
    cheatPhrase?: StringNullableFilter<"Card"> | string | null
    topic?: StringNullableFilter<"Card"> | string | null
    difficultyBase?: IntNullableFilter<"Card"> | number | null
    isActive?: BoolFilter<"Card"> | boolean
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    deck?: XOR<DeckScalarRelationFilter, DeckWhereInput>
    userStates?: UserCardStateListRelationFilter
    reviews?: ReviewLogListRelationFilter
  }, "id" | "deckId_externalRowId">

  export type CardOrderByWithAggregationInput = {
    id?: SortOrder
    deckId?: SortOrder
    externalRowId?: SortOrderInput | SortOrder
    armenianScript?: SortOrder
    translit?: SortOrder
    englishMeaning?: SortOrder
    exampleSentence?: SortOrderInput | SortOrder
    exampleTranslation?: SortOrderInput | SortOrder
    grammar?: SortOrderInput | SortOrder
    cheatPhrase?: SortOrderInput | SortOrder
    topic?: SortOrderInput | SortOrder
    difficultyBase?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CardCountOrderByAggregateInput
    _avg?: CardAvgOrderByAggregateInput
    _max?: CardMaxOrderByAggregateInput
    _min?: CardMinOrderByAggregateInput
    _sum?: CardSumOrderByAggregateInput
  }

  export type CardScalarWhereWithAggregatesInput = {
    AND?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    OR?: CardScalarWhereWithAggregatesInput[]
    NOT?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Card"> | string
    deckId?: StringWithAggregatesFilter<"Card"> | string
    externalRowId?: StringNullableWithAggregatesFilter<"Card"> | string | null
    armenianScript?: StringWithAggregatesFilter<"Card"> | string
    translit?: StringWithAggregatesFilter<"Card"> | string
    englishMeaning?: StringWithAggregatesFilter<"Card"> | string
    exampleSentence?: StringNullableWithAggregatesFilter<"Card"> | string | null
    exampleTranslation?: StringNullableWithAggregatesFilter<"Card"> | string | null
    grammar?: StringNullableWithAggregatesFilter<"Card"> | string | null
    cheatPhrase?: StringNullableWithAggregatesFilter<"Card"> | string | null
    topic?: StringNullableWithAggregatesFilter<"Card"> | string | null
    difficultyBase?: IntNullableWithAggregatesFilter<"Card"> | number | null
    isActive?: BoolWithAggregatesFilter<"Card"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
  }

  export type UserCardStateWhereInput = {
    AND?: UserCardStateWhereInput | UserCardStateWhereInput[]
    OR?: UserCardStateWhereInput[]
    NOT?: UserCardStateWhereInput | UserCardStateWhereInput[]
    id?: StringFilter<"UserCardState"> | string
    userId?: StringFilter<"UserCardState"> | string
    cardId?: StringFilter<"UserCardState"> | string
    easeFactor?: FloatFilter<"UserCardState"> | number
    interval?: IntFilter<"UserCardState"> | number
    repetitions?: IntFilter<"UserCardState"> | number
    lapses?: IntFilter<"UserCardState"> | number
    dueAt?: DateTimeFilter<"UserCardState"> | Date | string
    lastReviewedAt?: DateTimeNullableFilter<"UserCardState"> | Date | string | null
    isForwardLearned?: BoolFilter<"UserCardState"> | boolean
    isReverseLearned?: BoolFilter<"UserCardState"> | boolean
    isMastered?: BoolFilter<"UserCardState"> | boolean
    suspendedAt?: DateTimeNullableFilter<"UserCardState"> | Date | string | null
    createdAt?: DateTimeFilter<"UserCardState"> | Date | string
    updatedAt?: DateTimeFilter<"UserCardState"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    reviews?: ReviewLogListRelationFilter
  }

  export type UserCardStateOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
    dueAt?: SortOrder
    lastReviewedAt?: SortOrderInput | SortOrder
    isForwardLearned?: SortOrder
    isReverseLearned?: SortOrder
    isMastered?: SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    card?: CardOrderByWithRelationInput
    reviews?: ReviewLogOrderByRelationAggregateInput
  }

  export type UserCardStateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_cardId?: UserCardStateUserIdCardIdCompoundUniqueInput
    AND?: UserCardStateWhereInput | UserCardStateWhereInput[]
    OR?: UserCardStateWhereInput[]
    NOT?: UserCardStateWhereInput | UserCardStateWhereInput[]
    userId?: StringFilter<"UserCardState"> | string
    cardId?: StringFilter<"UserCardState"> | string
    easeFactor?: FloatFilter<"UserCardState"> | number
    interval?: IntFilter<"UserCardState"> | number
    repetitions?: IntFilter<"UserCardState"> | number
    lapses?: IntFilter<"UserCardState"> | number
    dueAt?: DateTimeFilter<"UserCardState"> | Date | string
    lastReviewedAt?: DateTimeNullableFilter<"UserCardState"> | Date | string | null
    isForwardLearned?: BoolFilter<"UserCardState"> | boolean
    isReverseLearned?: BoolFilter<"UserCardState"> | boolean
    isMastered?: BoolFilter<"UserCardState"> | boolean
    suspendedAt?: DateTimeNullableFilter<"UserCardState"> | Date | string | null
    createdAt?: DateTimeFilter<"UserCardState"> | Date | string
    updatedAt?: DateTimeFilter<"UserCardState"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    reviews?: ReviewLogListRelationFilter
  }, "id" | "userId_cardId">

  export type UserCardStateOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
    dueAt?: SortOrder
    lastReviewedAt?: SortOrderInput | SortOrder
    isForwardLearned?: SortOrder
    isReverseLearned?: SortOrder
    isMastered?: SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCardStateCountOrderByAggregateInput
    _avg?: UserCardStateAvgOrderByAggregateInput
    _max?: UserCardStateMaxOrderByAggregateInput
    _min?: UserCardStateMinOrderByAggregateInput
    _sum?: UserCardStateSumOrderByAggregateInput
  }

  export type UserCardStateScalarWhereWithAggregatesInput = {
    AND?: UserCardStateScalarWhereWithAggregatesInput | UserCardStateScalarWhereWithAggregatesInput[]
    OR?: UserCardStateScalarWhereWithAggregatesInput[]
    NOT?: UserCardStateScalarWhereWithAggregatesInput | UserCardStateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserCardState"> | string
    userId?: StringWithAggregatesFilter<"UserCardState"> | string
    cardId?: StringWithAggregatesFilter<"UserCardState"> | string
    easeFactor?: FloatWithAggregatesFilter<"UserCardState"> | number
    interval?: IntWithAggregatesFilter<"UserCardState"> | number
    repetitions?: IntWithAggregatesFilter<"UserCardState"> | number
    lapses?: IntWithAggregatesFilter<"UserCardState"> | number
    dueAt?: DateTimeWithAggregatesFilter<"UserCardState"> | Date | string
    lastReviewedAt?: DateTimeNullableWithAggregatesFilter<"UserCardState"> | Date | string | null
    isForwardLearned?: BoolWithAggregatesFilter<"UserCardState"> | boolean
    isReverseLearned?: BoolWithAggregatesFilter<"UserCardState"> | boolean
    isMastered?: BoolWithAggregatesFilter<"UserCardState"> | boolean
    suspendedAt?: DateTimeNullableWithAggregatesFilter<"UserCardState"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserCardState"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserCardState"> | Date | string
  }

  export type ReviewLogWhereInput = {
    AND?: ReviewLogWhereInput | ReviewLogWhereInput[]
    OR?: ReviewLogWhereInput[]
    NOT?: ReviewLogWhereInput | ReviewLogWhereInput[]
    id?: StringFilter<"ReviewLog"> | string
    userId?: StringFilter<"ReviewLog"> | string
    cardId?: StringFilter<"ReviewLog"> | string
    userCardStateId?: StringFilter<"ReviewLog"> | string
    direction?: StringFilter<"ReviewLog"> | string
    grade?: IntFilter<"ReviewLog"> | number
    responseTime?: IntNullableFilter<"ReviewLog"> | number | null
    scheduledBefore?: DateTimeFilter<"ReviewLog"> | Date | string
    scheduledAfter?: DateTimeFilter<"ReviewLog"> | Date | string
    createdAt?: DateTimeFilter<"ReviewLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    userCardState?: XOR<UserCardStateScalarRelationFilter, UserCardStateWhereInput>
  }

  export type ReviewLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    userCardStateId?: SortOrder
    direction?: SortOrder
    grade?: SortOrder
    responseTime?: SortOrderInput | SortOrder
    scheduledBefore?: SortOrder
    scheduledAfter?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    card?: CardOrderByWithRelationInput
    userCardState?: UserCardStateOrderByWithRelationInput
  }

  export type ReviewLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewLogWhereInput | ReviewLogWhereInput[]
    OR?: ReviewLogWhereInput[]
    NOT?: ReviewLogWhereInput | ReviewLogWhereInput[]
    userId?: StringFilter<"ReviewLog"> | string
    cardId?: StringFilter<"ReviewLog"> | string
    userCardStateId?: StringFilter<"ReviewLog"> | string
    direction?: StringFilter<"ReviewLog"> | string
    grade?: IntFilter<"ReviewLog"> | number
    responseTime?: IntNullableFilter<"ReviewLog"> | number | null
    scheduledBefore?: DateTimeFilter<"ReviewLog"> | Date | string
    scheduledAfter?: DateTimeFilter<"ReviewLog"> | Date | string
    createdAt?: DateTimeFilter<"ReviewLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    userCardState?: XOR<UserCardStateScalarRelationFilter, UserCardStateWhereInput>
  }, "id">

  export type ReviewLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    userCardStateId?: SortOrder
    direction?: SortOrder
    grade?: SortOrder
    responseTime?: SortOrderInput | SortOrder
    scheduledBefore?: SortOrder
    scheduledAfter?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewLogCountOrderByAggregateInput
    _avg?: ReviewLogAvgOrderByAggregateInput
    _max?: ReviewLogMaxOrderByAggregateInput
    _min?: ReviewLogMinOrderByAggregateInput
    _sum?: ReviewLogSumOrderByAggregateInput
  }

  export type ReviewLogScalarWhereWithAggregatesInput = {
    AND?: ReviewLogScalarWhereWithAggregatesInput | ReviewLogScalarWhereWithAggregatesInput[]
    OR?: ReviewLogScalarWhereWithAggregatesInput[]
    NOT?: ReviewLogScalarWhereWithAggregatesInput | ReviewLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReviewLog"> | string
    userId?: StringWithAggregatesFilter<"ReviewLog"> | string
    cardId?: StringWithAggregatesFilter<"ReviewLog"> | string
    userCardStateId?: StringWithAggregatesFilter<"ReviewLog"> | string
    direction?: StringWithAggregatesFilter<"ReviewLog"> | string
    grade?: IntWithAggregatesFilter<"ReviewLog"> | number
    responseTime?: IntNullableWithAggregatesFilter<"ReviewLog"> | number | null
    scheduledBefore?: DateTimeWithAggregatesFilter<"ReviewLog"> | Date | string
    scheduledAfter?: DateTimeWithAggregatesFilter<"ReviewLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ReviewLog"> | Date | string
  }

  export type ImportJobWhereInput = {
    AND?: ImportJobWhereInput | ImportJobWhereInput[]
    OR?: ImportJobWhereInput[]
    NOT?: ImportJobWhereInput | ImportJobWhereInput[]
    id?: StringFilter<"ImportJob"> | string
    deckId?: StringFilter<"ImportJob"> | string
    mode?: StringFilter<"ImportJob"> | string
    fileName?: StringFilter<"ImportJob"> | string
    fileHash?: StringFilter<"ImportJob"> | string
    rowsParsed?: IntFilter<"ImportJob"> | number
    rowsInserted?: IntFilter<"ImportJob"> | number
    rowsUpdated?: IntFilter<"ImportJob"> | number
    rowsSkipped?: IntFilter<"ImportJob"> | number
    errors?: StringNullableFilter<"ImportJob"> | string | null
    appliedAt?: DateTimeFilter<"ImportJob"> | Date | string
    deck?: XOR<DeckScalarRelationFilter, DeckWhereInput>
  }

  export type ImportJobOrderByWithRelationInput = {
    id?: SortOrder
    deckId?: SortOrder
    mode?: SortOrder
    fileName?: SortOrder
    fileHash?: SortOrder
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
    errors?: SortOrderInput | SortOrder
    appliedAt?: SortOrder
    deck?: DeckOrderByWithRelationInput
  }

  export type ImportJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImportJobWhereInput | ImportJobWhereInput[]
    OR?: ImportJobWhereInput[]
    NOT?: ImportJobWhereInput | ImportJobWhereInput[]
    deckId?: StringFilter<"ImportJob"> | string
    mode?: StringFilter<"ImportJob"> | string
    fileName?: StringFilter<"ImportJob"> | string
    fileHash?: StringFilter<"ImportJob"> | string
    rowsParsed?: IntFilter<"ImportJob"> | number
    rowsInserted?: IntFilter<"ImportJob"> | number
    rowsUpdated?: IntFilter<"ImportJob"> | number
    rowsSkipped?: IntFilter<"ImportJob"> | number
    errors?: StringNullableFilter<"ImportJob"> | string | null
    appliedAt?: DateTimeFilter<"ImportJob"> | Date | string
    deck?: XOR<DeckScalarRelationFilter, DeckWhereInput>
  }, "id">

  export type ImportJobOrderByWithAggregationInput = {
    id?: SortOrder
    deckId?: SortOrder
    mode?: SortOrder
    fileName?: SortOrder
    fileHash?: SortOrder
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
    errors?: SortOrderInput | SortOrder
    appliedAt?: SortOrder
    _count?: ImportJobCountOrderByAggregateInput
    _avg?: ImportJobAvgOrderByAggregateInput
    _max?: ImportJobMaxOrderByAggregateInput
    _min?: ImportJobMinOrderByAggregateInput
    _sum?: ImportJobSumOrderByAggregateInput
  }

  export type ImportJobScalarWhereWithAggregatesInput = {
    AND?: ImportJobScalarWhereWithAggregatesInput | ImportJobScalarWhereWithAggregatesInput[]
    OR?: ImportJobScalarWhereWithAggregatesInput[]
    NOT?: ImportJobScalarWhereWithAggregatesInput | ImportJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImportJob"> | string
    deckId?: StringWithAggregatesFilter<"ImportJob"> | string
    mode?: StringWithAggregatesFilter<"ImportJob"> | string
    fileName?: StringWithAggregatesFilter<"ImportJob"> | string
    fileHash?: StringWithAggregatesFilter<"ImportJob"> | string
    rowsParsed?: IntWithAggregatesFilter<"ImportJob"> | number
    rowsInserted?: IntWithAggregatesFilter<"ImportJob"> | number
    rowsUpdated?: IntWithAggregatesFilter<"ImportJob"> | number
    rowsSkipped?: IntWithAggregatesFilter<"ImportJob"> | number
    errors?: StringNullableWithAggregatesFilter<"ImportJob"> | string | null
    appliedAt?: DateTimeWithAggregatesFilter<"ImportJob"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    decks?: DeckCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    decks?: DeckUncheckedCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    decks?: DeckUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    decks?: DeckUncheckedUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeckCreateInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    owner: UserCreateNestedOneWithoutDecksInput
    cards?: CardCreateNestedManyWithoutDeckInput
    imports?: ImportJobCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateInput = {
    id?: string
    ownerId: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
    imports?: ImportJobUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: UserUpdateOneRequiredWithoutDecksNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
    imports?: ImportJobUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
    imports?: ImportJobUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type DeckCreateManyInput = {
    id?: string
    ownerId: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
  }

  export type DeckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CardCreateInput = {
    id?: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deck: DeckCreateNestedOneWithoutCardsInput
    userStates?: UserCardStateCreateNestedManyWithoutCardInput
    reviews?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateInput = {
    id?: string
    deckId: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userStates?: UserCardStateUncheckedCreateNestedManyWithoutCardInput
    reviews?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
    userStates?: UserCardStateUpdateManyWithoutCardNestedInput
    reviews?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userStates?: UserCardStateUncheckedUpdateManyWithoutCardNestedInput
    reviews?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardCreateManyInput = {
    id?: string
    deckId: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardStateCreateInput = {
    id?: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCardStatesInput
    card: CardCreateNestedOneWithoutUserStatesInput
    reviews?: ReviewLogCreateNestedManyWithoutUserCardStateInput
  }

  export type UserCardStateUncheckedCreateInput = {
    id?: string
    userId: string
    cardId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewLogUncheckedCreateNestedManyWithoutUserCardStateInput
  }

  export type UserCardStateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCardStatesNestedInput
    card?: CardUpdateOneRequiredWithoutUserStatesNestedInput
    reviews?: ReviewLogUpdateManyWithoutUserCardStateNestedInput
  }

  export type UserCardStateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewLogUncheckedUpdateManyWithoutUserCardStateNestedInput
  }

  export type UserCardStateCreateManyInput = {
    id?: string
    userId: string
    cardId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCardStateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardStateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogCreateInput = {
    id?: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewLogsInput
    card: CardCreateNestedOneWithoutReviewsInput
    userCardState: UserCardStateCreateNestedOneWithoutReviewsInput
  }

  export type ReviewLogUncheckedCreateInput = {
    id?: string
    userId: string
    cardId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type ReviewLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewLogsNestedInput
    card?: CardUpdateOneRequiredWithoutReviewsNestedInput
    userCardState?: UserCardStateUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    userCardStateId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogCreateManyInput = {
    id?: string
    userId: string
    cardId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type ReviewLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    userCardStateId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportJobCreateInput = {
    id?: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors?: string | null
    appliedAt?: Date | string
    deck: DeckCreateNestedOneWithoutImportsInput
  }

  export type ImportJobUncheckedCreateInput = {
    id?: string
    deckId: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors?: string | null
    appliedAt?: Date | string
  }

  export type ImportJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deck?: DeckUpdateOneRequiredWithoutImportsNestedInput
  }

  export type ImportJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportJobCreateManyInput = {
    id?: string
    deckId: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors?: string | null
    appliedAt?: Date | string
  }

  export type ImportJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type DeckListRelationFilter = {
    every?: DeckWhereInput
    some?: DeckWhereInput
    none?: DeckWhereInput
  }

  export type UserCardStateListRelationFilter = {
    every?: UserCardStateWhereInput
    some?: UserCardStateWhereInput
    none?: UserCardStateWhereInput
  }

  export type ReviewLogListRelationFilter = {
    every?: ReviewLogWhereInput
    some?: ReviewLogWhereInput
    none?: ReviewLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCardStateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardListRelationFilter = {
    every?: CardWhereInput
    some?: CardWhereInput
    none?: CardWhereInput
  }

  export type ImportJobListRelationFilter = {
    every?: ImportJobWhereInput
    some?: ImportJobWhereInput
    none?: ImportJobWhereInput
  }

  export type CardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImportJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeckOwnerIdSlugCompoundUniqueInput = {
    ownerId: string
    slug: string
  }

  export type DeckCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceFingerprint?: SortOrder
  }

  export type DeckMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceFingerprint?: SortOrder
  }

  export type DeckMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceFingerprint?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DeckScalarRelationFilter = {
    is?: DeckWhereInput
    isNot?: DeckWhereInput
  }

  export type CardDeckIdExternalRowIdCompoundUniqueInput = {
    deckId: string
    externalRowId: string
  }

  export type CardCountOrderByAggregateInput = {
    id?: SortOrder
    deckId?: SortOrder
    externalRowId?: SortOrder
    armenianScript?: SortOrder
    translit?: SortOrder
    englishMeaning?: SortOrder
    exampleSentence?: SortOrder
    exampleTranslation?: SortOrder
    grammar?: SortOrder
    cheatPhrase?: SortOrder
    topic?: SortOrder
    difficultyBase?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardAvgOrderByAggregateInput = {
    difficultyBase?: SortOrder
  }

  export type CardMaxOrderByAggregateInput = {
    id?: SortOrder
    deckId?: SortOrder
    externalRowId?: SortOrder
    armenianScript?: SortOrder
    translit?: SortOrder
    englishMeaning?: SortOrder
    exampleSentence?: SortOrder
    exampleTranslation?: SortOrder
    grammar?: SortOrder
    cheatPhrase?: SortOrder
    topic?: SortOrder
    difficultyBase?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardMinOrderByAggregateInput = {
    id?: SortOrder
    deckId?: SortOrder
    externalRowId?: SortOrder
    armenianScript?: SortOrder
    translit?: SortOrder
    englishMeaning?: SortOrder
    exampleSentence?: SortOrder
    exampleTranslation?: SortOrder
    grammar?: SortOrder
    cheatPhrase?: SortOrder
    topic?: SortOrder
    difficultyBase?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardSumOrderByAggregateInput = {
    difficultyBase?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CardScalarRelationFilter = {
    is?: CardWhereInput
    isNot?: CardWhereInput
  }

  export type UserCardStateUserIdCardIdCompoundUniqueInput = {
    userId: string
    cardId: string
  }

  export type UserCardStateCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
    dueAt?: SortOrder
    lastReviewedAt?: SortOrder
    isForwardLearned?: SortOrder
    isReverseLearned?: SortOrder
    isMastered?: SortOrder
    suspendedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCardStateAvgOrderByAggregateInput = {
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
  }

  export type UserCardStateMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
    dueAt?: SortOrder
    lastReviewedAt?: SortOrder
    isForwardLearned?: SortOrder
    isReverseLearned?: SortOrder
    isMastered?: SortOrder
    suspendedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCardStateMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
    dueAt?: SortOrder
    lastReviewedAt?: SortOrder
    isForwardLearned?: SortOrder
    isReverseLearned?: SortOrder
    isMastered?: SortOrder
    suspendedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCardStateSumOrderByAggregateInput = {
    easeFactor?: SortOrder
    interval?: SortOrder
    repetitions?: SortOrder
    lapses?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserCardStateScalarRelationFilter = {
    is?: UserCardStateWhereInput
    isNot?: UserCardStateWhereInput
  }

  export type ReviewLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    userCardStateId?: SortOrder
    direction?: SortOrder
    grade?: SortOrder
    responseTime?: SortOrder
    scheduledBefore?: SortOrder
    scheduledAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewLogAvgOrderByAggregateInput = {
    grade?: SortOrder
    responseTime?: SortOrder
  }

  export type ReviewLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    userCardStateId?: SortOrder
    direction?: SortOrder
    grade?: SortOrder
    responseTime?: SortOrder
    scheduledBefore?: SortOrder
    scheduledAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    userCardStateId?: SortOrder
    direction?: SortOrder
    grade?: SortOrder
    responseTime?: SortOrder
    scheduledBefore?: SortOrder
    scheduledAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewLogSumOrderByAggregateInput = {
    grade?: SortOrder
    responseTime?: SortOrder
  }

  export type ImportJobCountOrderByAggregateInput = {
    id?: SortOrder
    deckId?: SortOrder
    mode?: SortOrder
    fileName?: SortOrder
    fileHash?: SortOrder
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
    errors?: SortOrder
    appliedAt?: SortOrder
  }

  export type ImportJobAvgOrderByAggregateInput = {
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
  }

  export type ImportJobMaxOrderByAggregateInput = {
    id?: SortOrder
    deckId?: SortOrder
    mode?: SortOrder
    fileName?: SortOrder
    fileHash?: SortOrder
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
    errors?: SortOrder
    appliedAt?: SortOrder
  }

  export type ImportJobMinOrderByAggregateInput = {
    id?: SortOrder
    deckId?: SortOrder
    mode?: SortOrder
    fileName?: SortOrder
    fileHash?: SortOrder
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
    errors?: SortOrder
    appliedAt?: SortOrder
  }

  export type ImportJobSumOrderByAggregateInput = {
    rowsParsed?: SortOrder
    rowsInserted?: SortOrder
    rowsUpdated?: SortOrder
    rowsSkipped?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type DeckCreateNestedManyWithoutOwnerInput = {
    create?: XOR<DeckCreateWithoutOwnerInput, DeckUncheckedCreateWithoutOwnerInput> | DeckCreateWithoutOwnerInput[] | DeckUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutOwnerInput | DeckCreateOrConnectWithoutOwnerInput[]
    createMany?: DeckCreateManyOwnerInputEnvelope
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
  }

  export type UserCardStateCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCardStateCreateWithoutUserInput, UserCardStateUncheckedCreateWithoutUserInput> | UserCardStateCreateWithoutUserInput[] | UserCardStateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutUserInput | UserCardStateCreateOrConnectWithoutUserInput[]
    createMany?: UserCardStateCreateManyUserInputEnvelope
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
  }

  export type ReviewLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type DeckUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<DeckCreateWithoutOwnerInput, DeckUncheckedCreateWithoutOwnerInput> | DeckCreateWithoutOwnerInput[] | DeckUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutOwnerInput | DeckCreateOrConnectWithoutOwnerInput[]
    createMany?: DeckCreateManyOwnerInputEnvelope
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
  }

  export type UserCardStateUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCardStateCreateWithoutUserInput, UserCardStateUncheckedCreateWithoutUserInput> | UserCardStateCreateWithoutUserInput[] | UserCardStateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutUserInput | UserCardStateCreateOrConnectWithoutUserInput[]
    createMany?: UserCardStateCreateManyUserInputEnvelope
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
  }

  export type ReviewLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type DeckUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<DeckCreateWithoutOwnerInput, DeckUncheckedCreateWithoutOwnerInput> | DeckCreateWithoutOwnerInput[] | DeckUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutOwnerInput | DeckCreateOrConnectWithoutOwnerInput[]
    upsert?: DeckUpsertWithWhereUniqueWithoutOwnerInput | DeckUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: DeckCreateManyOwnerInputEnvelope
    set?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    disconnect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    delete?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    update?: DeckUpdateWithWhereUniqueWithoutOwnerInput | DeckUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: DeckUpdateManyWithWhereWithoutOwnerInput | DeckUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: DeckScalarWhereInput | DeckScalarWhereInput[]
  }

  export type UserCardStateUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCardStateCreateWithoutUserInput, UserCardStateUncheckedCreateWithoutUserInput> | UserCardStateCreateWithoutUserInput[] | UserCardStateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutUserInput | UserCardStateCreateOrConnectWithoutUserInput[]
    upsert?: UserCardStateUpsertWithWhereUniqueWithoutUserInput | UserCardStateUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCardStateCreateManyUserInputEnvelope
    set?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    disconnect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    delete?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    update?: UserCardStateUpdateWithWhereUniqueWithoutUserInput | UserCardStateUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCardStateUpdateManyWithWhereWithoutUserInput | UserCardStateUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCardStateScalarWhereInput | UserCardStateScalarWhereInput[]
  }

  export type ReviewLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutUserInput | ReviewLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutUserInput | ReviewLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutUserInput | ReviewLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type DeckUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<DeckCreateWithoutOwnerInput, DeckUncheckedCreateWithoutOwnerInput> | DeckCreateWithoutOwnerInput[] | DeckUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutOwnerInput | DeckCreateOrConnectWithoutOwnerInput[]
    upsert?: DeckUpsertWithWhereUniqueWithoutOwnerInput | DeckUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: DeckCreateManyOwnerInputEnvelope
    set?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    disconnect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    delete?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    update?: DeckUpdateWithWhereUniqueWithoutOwnerInput | DeckUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: DeckUpdateManyWithWhereWithoutOwnerInput | DeckUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: DeckScalarWhereInput | DeckScalarWhereInput[]
  }

  export type UserCardStateUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCardStateCreateWithoutUserInput, UserCardStateUncheckedCreateWithoutUserInput> | UserCardStateCreateWithoutUserInput[] | UserCardStateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutUserInput | UserCardStateCreateOrConnectWithoutUserInput[]
    upsert?: UserCardStateUpsertWithWhereUniqueWithoutUserInput | UserCardStateUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCardStateCreateManyUserInputEnvelope
    set?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    disconnect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    delete?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    update?: UserCardStateUpdateWithWhereUniqueWithoutUserInput | UserCardStateUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCardStateUpdateManyWithWhereWithoutUserInput | UserCardStateUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCardStateScalarWhereInput | UserCardStateScalarWhereInput[]
  }

  export type ReviewLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutUserInput | ReviewLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutUserInput | ReviewLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutUserInput | ReviewLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutDecksInput = {
    create?: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
    connectOrCreate?: UserCreateOrConnectWithoutDecksInput
    connect?: UserWhereUniqueInput
  }

  export type CardCreateNestedManyWithoutDeckInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type ImportJobCreateNestedManyWithoutDeckInput = {
    create?: XOR<ImportJobCreateWithoutDeckInput, ImportJobUncheckedCreateWithoutDeckInput> | ImportJobCreateWithoutDeckInput[] | ImportJobUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: ImportJobCreateOrConnectWithoutDeckInput | ImportJobCreateOrConnectWithoutDeckInput[]
    createMany?: ImportJobCreateManyDeckInputEnvelope
    connect?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
  }

  export type CardUncheckedCreateNestedManyWithoutDeckInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type ImportJobUncheckedCreateNestedManyWithoutDeckInput = {
    create?: XOR<ImportJobCreateWithoutDeckInput, ImportJobUncheckedCreateWithoutDeckInput> | ImportJobCreateWithoutDeckInput[] | ImportJobUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: ImportJobCreateOrConnectWithoutDeckInput | ImportJobCreateOrConnectWithoutDeckInput[]
    createMany?: ImportJobCreateManyDeckInputEnvelope
    connect?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDecksNestedInput = {
    create?: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
    connectOrCreate?: UserCreateOrConnectWithoutDecksInput
    upsert?: UserUpsertWithoutDecksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDecksInput, UserUpdateWithoutDecksInput>, UserUncheckedUpdateWithoutDecksInput>
  }

  export type CardUpdateManyWithoutDeckNestedInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutDeckInput | CardUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutDeckInput | CardUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: CardUpdateManyWithWhereWithoutDeckInput | CardUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type ImportJobUpdateManyWithoutDeckNestedInput = {
    create?: XOR<ImportJobCreateWithoutDeckInput, ImportJobUncheckedCreateWithoutDeckInput> | ImportJobCreateWithoutDeckInput[] | ImportJobUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: ImportJobCreateOrConnectWithoutDeckInput | ImportJobCreateOrConnectWithoutDeckInput[]
    upsert?: ImportJobUpsertWithWhereUniqueWithoutDeckInput | ImportJobUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: ImportJobCreateManyDeckInputEnvelope
    set?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    disconnect?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    delete?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    connect?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    update?: ImportJobUpdateWithWhereUniqueWithoutDeckInput | ImportJobUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: ImportJobUpdateManyWithWhereWithoutDeckInput | ImportJobUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: ImportJobScalarWhereInput | ImportJobScalarWhereInput[]
  }

  export type CardUncheckedUpdateManyWithoutDeckNestedInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutDeckInput | CardUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutDeckInput | CardUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: CardUpdateManyWithWhereWithoutDeckInput | CardUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type ImportJobUncheckedUpdateManyWithoutDeckNestedInput = {
    create?: XOR<ImportJobCreateWithoutDeckInput, ImportJobUncheckedCreateWithoutDeckInput> | ImportJobCreateWithoutDeckInput[] | ImportJobUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: ImportJobCreateOrConnectWithoutDeckInput | ImportJobCreateOrConnectWithoutDeckInput[]
    upsert?: ImportJobUpsertWithWhereUniqueWithoutDeckInput | ImportJobUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: ImportJobCreateManyDeckInputEnvelope
    set?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    disconnect?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    delete?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    connect?: ImportJobWhereUniqueInput | ImportJobWhereUniqueInput[]
    update?: ImportJobUpdateWithWhereUniqueWithoutDeckInput | ImportJobUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: ImportJobUpdateManyWithWhereWithoutDeckInput | ImportJobUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: ImportJobScalarWhereInput | ImportJobScalarWhereInput[]
  }

  export type DeckCreateNestedOneWithoutCardsInput = {
    create?: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
    connectOrCreate?: DeckCreateOrConnectWithoutCardsInput
    connect?: DeckWhereUniqueInput
  }

  export type UserCardStateCreateNestedManyWithoutCardInput = {
    create?: XOR<UserCardStateCreateWithoutCardInput, UserCardStateUncheckedCreateWithoutCardInput> | UserCardStateCreateWithoutCardInput[] | UserCardStateUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutCardInput | UserCardStateCreateOrConnectWithoutCardInput[]
    createMany?: UserCardStateCreateManyCardInputEnvelope
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
  }

  export type ReviewLogCreateNestedManyWithoutCardInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type UserCardStateUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<UserCardStateCreateWithoutCardInput, UserCardStateUncheckedCreateWithoutCardInput> | UserCardStateCreateWithoutCardInput[] | UserCardStateUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutCardInput | UserCardStateCreateOrConnectWithoutCardInput[]
    createMany?: UserCardStateCreateManyCardInputEnvelope
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
  }

  export type ReviewLogUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DeckUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
    connectOrCreate?: DeckCreateOrConnectWithoutCardsInput
    upsert?: DeckUpsertWithoutCardsInput
    connect?: DeckWhereUniqueInput
    update?: XOR<XOR<DeckUpdateToOneWithWhereWithoutCardsInput, DeckUpdateWithoutCardsInput>, DeckUncheckedUpdateWithoutCardsInput>
  }

  export type UserCardStateUpdateManyWithoutCardNestedInput = {
    create?: XOR<UserCardStateCreateWithoutCardInput, UserCardStateUncheckedCreateWithoutCardInput> | UserCardStateCreateWithoutCardInput[] | UserCardStateUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutCardInput | UserCardStateCreateOrConnectWithoutCardInput[]
    upsert?: UserCardStateUpsertWithWhereUniqueWithoutCardInput | UserCardStateUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: UserCardStateCreateManyCardInputEnvelope
    set?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    disconnect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    delete?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    update?: UserCardStateUpdateWithWhereUniqueWithoutCardInput | UserCardStateUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: UserCardStateUpdateManyWithWhereWithoutCardInput | UserCardStateUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: UserCardStateScalarWhereInput | UserCardStateScalarWhereInput[]
  }

  export type ReviewLogUpdateManyWithoutCardNestedInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutCardInput | ReviewLogUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutCardInput | ReviewLogUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutCardInput | ReviewLogUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type UserCardStateUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<UserCardStateCreateWithoutCardInput, UserCardStateUncheckedCreateWithoutCardInput> | UserCardStateCreateWithoutCardInput[] | UserCardStateUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardStateCreateOrConnectWithoutCardInput | UserCardStateCreateOrConnectWithoutCardInput[]
    upsert?: UserCardStateUpsertWithWhereUniqueWithoutCardInput | UserCardStateUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: UserCardStateCreateManyCardInputEnvelope
    set?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    disconnect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    delete?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    connect?: UserCardStateWhereUniqueInput | UserCardStateWhereUniqueInput[]
    update?: UserCardStateUpdateWithWhereUniqueWithoutCardInput | UserCardStateUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: UserCardStateUpdateManyWithWhereWithoutCardInput | UserCardStateUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: UserCardStateScalarWhereInput | UserCardStateScalarWhereInput[]
  }

  export type ReviewLogUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutCardInput | ReviewLogUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutCardInput | ReviewLogUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutCardInput | ReviewLogUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCardStatesInput = {
    create?: XOR<UserCreateWithoutCardStatesInput, UserUncheckedCreateWithoutCardStatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardStatesInput
    connect?: UserWhereUniqueInput
  }

  export type CardCreateNestedOneWithoutUserStatesInput = {
    create?: XOR<CardCreateWithoutUserStatesInput, CardUncheckedCreateWithoutUserStatesInput>
    connectOrCreate?: CardCreateOrConnectWithoutUserStatesInput
    connect?: CardWhereUniqueInput
  }

  export type ReviewLogCreateNestedManyWithoutUserCardStateInput = {
    create?: XOR<ReviewLogCreateWithoutUserCardStateInput, ReviewLogUncheckedCreateWithoutUserCardStateInput> | ReviewLogCreateWithoutUserCardStateInput[] | ReviewLogUncheckedCreateWithoutUserCardStateInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserCardStateInput | ReviewLogCreateOrConnectWithoutUserCardStateInput[]
    createMany?: ReviewLogCreateManyUserCardStateInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type ReviewLogUncheckedCreateNestedManyWithoutUserCardStateInput = {
    create?: XOR<ReviewLogCreateWithoutUserCardStateInput, ReviewLogUncheckedCreateWithoutUserCardStateInput> | ReviewLogCreateWithoutUserCardStateInput[] | ReviewLogUncheckedCreateWithoutUserCardStateInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserCardStateInput | ReviewLogCreateOrConnectWithoutUserCardStateInput[]
    createMany?: ReviewLogCreateManyUserCardStateInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCardStatesNestedInput = {
    create?: XOR<UserCreateWithoutCardStatesInput, UserUncheckedCreateWithoutCardStatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardStatesInput
    upsert?: UserUpsertWithoutCardStatesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCardStatesInput, UserUpdateWithoutCardStatesInput>, UserUncheckedUpdateWithoutCardStatesInput>
  }

  export type CardUpdateOneRequiredWithoutUserStatesNestedInput = {
    create?: XOR<CardCreateWithoutUserStatesInput, CardUncheckedCreateWithoutUserStatesInput>
    connectOrCreate?: CardCreateOrConnectWithoutUserStatesInput
    upsert?: CardUpsertWithoutUserStatesInput
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutUserStatesInput, CardUpdateWithoutUserStatesInput>, CardUncheckedUpdateWithoutUserStatesInput>
  }

  export type ReviewLogUpdateManyWithoutUserCardStateNestedInput = {
    create?: XOR<ReviewLogCreateWithoutUserCardStateInput, ReviewLogUncheckedCreateWithoutUserCardStateInput> | ReviewLogCreateWithoutUserCardStateInput[] | ReviewLogUncheckedCreateWithoutUserCardStateInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserCardStateInput | ReviewLogCreateOrConnectWithoutUserCardStateInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutUserCardStateInput | ReviewLogUpsertWithWhereUniqueWithoutUserCardStateInput[]
    createMany?: ReviewLogCreateManyUserCardStateInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutUserCardStateInput | ReviewLogUpdateWithWhereUniqueWithoutUserCardStateInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutUserCardStateInput | ReviewLogUpdateManyWithWhereWithoutUserCardStateInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type ReviewLogUncheckedUpdateManyWithoutUserCardStateNestedInput = {
    create?: XOR<ReviewLogCreateWithoutUserCardStateInput, ReviewLogUncheckedCreateWithoutUserCardStateInput> | ReviewLogCreateWithoutUserCardStateInput[] | ReviewLogUncheckedCreateWithoutUserCardStateInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserCardStateInput | ReviewLogCreateOrConnectWithoutUserCardStateInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutUserCardStateInput | ReviewLogUpsertWithWhereUniqueWithoutUserCardStateInput[]
    createMany?: ReviewLogCreateManyUserCardStateInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutUserCardStateInput | ReviewLogUpdateWithWhereUniqueWithoutUserCardStateInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutUserCardStateInput | ReviewLogUpdateManyWithWhereWithoutUserCardStateInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReviewLogsInput = {
    create?: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewLogsInput
    connect?: UserWhereUniqueInput
  }

  export type CardCreateNestedOneWithoutReviewsInput = {
    create?: XOR<CardCreateWithoutReviewsInput, CardUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CardCreateOrConnectWithoutReviewsInput
    connect?: CardWhereUniqueInput
  }

  export type UserCardStateCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCardStateCreateWithoutReviewsInput, UserCardStateUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCardStateCreateOrConnectWithoutReviewsInput
    connect?: UserCardStateWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReviewLogsNestedInput = {
    create?: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewLogsInput
    upsert?: UserUpsertWithoutReviewLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewLogsInput, UserUpdateWithoutReviewLogsInput>, UserUncheckedUpdateWithoutReviewLogsInput>
  }

  export type CardUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<CardCreateWithoutReviewsInput, CardUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CardCreateOrConnectWithoutReviewsInput
    upsert?: CardUpsertWithoutReviewsInput
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutReviewsInput, CardUpdateWithoutReviewsInput>, CardUncheckedUpdateWithoutReviewsInput>
  }

  export type UserCardStateUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCardStateCreateWithoutReviewsInput, UserCardStateUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCardStateCreateOrConnectWithoutReviewsInput
    upsert?: UserCardStateUpsertWithoutReviewsInput
    connect?: UserCardStateWhereUniqueInput
    update?: XOR<XOR<UserCardStateUpdateToOneWithWhereWithoutReviewsInput, UserCardStateUpdateWithoutReviewsInput>, UserCardStateUncheckedUpdateWithoutReviewsInput>
  }

  export type DeckCreateNestedOneWithoutImportsInput = {
    create?: XOR<DeckCreateWithoutImportsInput, DeckUncheckedCreateWithoutImportsInput>
    connectOrCreate?: DeckCreateOrConnectWithoutImportsInput
    connect?: DeckWhereUniqueInput
  }

  export type DeckUpdateOneRequiredWithoutImportsNestedInput = {
    create?: XOR<DeckCreateWithoutImportsInput, DeckUncheckedCreateWithoutImportsInput>
    connectOrCreate?: DeckCreateOrConnectWithoutImportsInput
    upsert?: DeckUpsertWithoutImportsInput
    connect?: DeckWhereUniqueInput
    update?: XOR<XOR<DeckUpdateToOneWithWhereWithoutImportsInput, DeckUpdateWithoutImportsInput>, DeckUncheckedUpdateWithoutImportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DeckCreateWithoutOwnerInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    cards?: CardCreateNestedManyWithoutDeckInput
    imports?: ImportJobCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
    imports?: ImportJobUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutOwnerInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutOwnerInput, DeckUncheckedCreateWithoutOwnerInput>
  }

  export type DeckCreateManyOwnerInputEnvelope = {
    data: DeckCreateManyOwnerInput | DeckCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UserCardStateCreateWithoutUserInput = {
    id?: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    card: CardCreateNestedOneWithoutUserStatesInput
    reviews?: ReviewLogCreateNestedManyWithoutUserCardStateInput
  }

  export type UserCardStateUncheckedCreateWithoutUserInput = {
    id?: string
    cardId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewLogUncheckedCreateNestedManyWithoutUserCardStateInput
  }

  export type UserCardStateCreateOrConnectWithoutUserInput = {
    where: UserCardStateWhereUniqueInput
    create: XOR<UserCardStateCreateWithoutUserInput, UserCardStateUncheckedCreateWithoutUserInput>
  }

  export type UserCardStateCreateManyUserInputEnvelope = {
    data: UserCardStateCreateManyUserInput | UserCardStateCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewLogCreateWithoutUserInput = {
    id?: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
    card: CardCreateNestedOneWithoutReviewsInput
    userCardState: UserCardStateCreateNestedOneWithoutReviewsInput
  }

  export type ReviewLogUncheckedCreateWithoutUserInput = {
    id?: string
    cardId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type ReviewLogCreateOrConnectWithoutUserInput = {
    where: ReviewLogWhereUniqueInput
    create: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput>
  }

  export type ReviewLogCreateManyUserInputEnvelope = {
    data: ReviewLogCreateManyUserInput | ReviewLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type DeckUpsertWithWhereUniqueWithoutOwnerInput = {
    where: DeckWhereUniqueInput
    update: XOR<DeckUpdateWithoutOwnerInput, DeckUncheckedUpdateWithoutOwnerInput>
    create: XOR<DeckCreateWithoutOwnerInput, DeckUncheckedCreateWithoutOwnerInput>
  }

  export type DeckUpdateWithWhereUniqueWithoutOwnerInput = {
    where: DeckWhereUniqueInput
    data: XOR<DeckUpdateWithoutOwnerInput, DeckUncheckedUpdateWithoutOwnerInput>
  }

  export type DeckUpdateManyWithWhereWithoutOwnerInput = {
    where: DeckScalarWhereInput
    data: XOR<DeckUpdateManyMutationInput, DeckUncheckedUpdateManyWithoutOwnerInput>
  }

  export type DeckScalarWhereInput = {
    AND?: DeckScalarWhereInput | DeckScalarWhereInput[]
    OR?: DeckScalarWhereInput[]
    NOT?: DeckScalarWhereInput | DeckScalarWhereInput[]
    id?: StringFilter<"Deck"> | string
    ownerId?: StringFilter<"Deck"> | string
    title?: StringFilter<"Deck"> | string
    slug?: StringFilter<"Deck"> | string
    description?: StringNullableFilter<"Deck"> | string | null
    createdAt?: DateTimeFilter<"Deck"> | Date | string
    updatedAt?: DateTimeFilter<"Deck"> | Date | string
    sourceFingerprint?: StringNullableFilter<"Deck"> | string | null
  }

  export type UserCardStateUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCardStateWhereUniqueInput
    update: XOR<UserCardStateUpdateWithoutUserInput, UserCardStateUncheckedUpdateWithoutUserInput>
    create: XOR<UserCardStateCreateWithoutUserInput, UserCardStateUncheckedCreateWithoutUserInput>
  }

  export type UserCardStateUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCardStateWhereUniqueInput
    data: XOR<UserCardStateUpdateWithoutUserInput, UserCardStateUncheckedUpdateWithoutUserInput>
  }

  export type UserCardStateUpdateManyWithWhereWithoutUserInput = {
    where: UserCardStateScalarWhereInput
    data: XOR<UserCardStateUpdateManyMutationInput, UserCardStateUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCardStateScalarWhereInput = {
    AND?: UserCardStateScalarWhereInput | UserCardStateScalarWhereInput[]
    OR?: UserCardStateScalarWhereInput[]
    NOT?: UserCardStateScalarWhereInput | UserCardStateScalarWhereInput[]
    id?: StringFilter<"UserCardState"> | string
    userId?: StringFilter<"UserCardState"> | string
    cardId?: StringFilter<"UserCardState"> | string
    easeFactor?: FloatFilter<"UserCardState"> | number
    interval?: IntFilter<"UserCardState"> | number
    repetitions?: IntFilter<"UserCardState"> | number
    lapses?: IntFilter<"UserCardState"> | number
    dueAt?: DateTimeFilter<"UserCardState"> | Date | string
    lastReviewedAt?: DateTimeNullableFilter<"UserCardState"> | Date | string | null
    isForwardLearned?: BoolFilter<"UserCardState"> | boolean
    isReverseLearned?: BoolFilter<"UserCardState"> | boolean
    isMastered?: BoolFilter<"UserCardState"> | boolean
    suspendedAt?: DateTimeNullableFilter<"UserCardState"> | Date | string | null
    createdAt?: DateTimeFilter<"UserCardState"> | Date | string
    updatedAt?: DateTimeFilter<"UserCardState"> | Date | string
  }

  export type ReviewLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewLogWhereUniqueInput
    update: XOR<ReviewLogUpdateWithoutUserInput, ReviewLogUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput>
  }

  export type ReviewLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewLogWhereUniqueInput
    data: XOR<ReviewLogUpdateWithoutUserInput, ReviewLogUncheckedUpdateWithoutUserInput>
  }

  export type ReviewLogUpdateManyWithWhereWithoutUserInput = {
    where: ReviewLogScalarWhereInput
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewLogScalarWhereInput = {
    AND?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
    OR?: ReviewLogScalarWhereInput[]
    NOT?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
    id?: StringFilter<"ReviewLog"> | string
    userId?: StringFilter<"ReviewLog"> | string
    cardId?: StringFilter<"ReviewLog"> | string
    userCardStateId?: StringFilter<"ReviewLog"> | string
    direction?: StringFilter<"ReviewLog"> | string
    grade?: IntFilter<"ReviewLog"> | number
    responseTime?: IntNullableFilter<"ReviewLog"> | number | null
    scheduledBefore?: DateTimeFilter<"ReviewLog"> | Date | string
    scheduledAfter?: DateTimeFilter<"ReviewLog"> | Date | string
    createdAt?: DateTimeFilter<"ReviewLog"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    decks?: DeckCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    decks?: DeckUncheckedCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    decks?: DeckUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    decks?: DeckUncheckedUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    decks?: DeckCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    decks?: DeckUncheckedCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    decks?: DeckUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    decks?: DeckUncheckedUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDecksInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    cardStates?: UserCardStateCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDecksInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cardStates?: UserCardStateUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDecksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
  }

  export type CardCreateWithoutDeckInput = {
    id?: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userStates?: UserCardStateCreateNestedManyWithoutCardInput
    reviews?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutDeckInput = {
    id?: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userStates?: UserCardStateUncheckedCreateNestedManyWithoutCardInput
    reviews?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutDeckInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput>
  }

  export type CardCreateManyDeckInputEnvelope = {
    data: CardCreateManyDeckInput | CardCreateManyDeckInput[]
    skipDuplicates?: boolean
  }

  export type ImportJobCreateWithoutDeckInput = {
    id?: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors?: string | null
    appliedAt?: Date | string
  }

  export type ImportJobUncheckedCreateWithoutDeckInput = {
    id?: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors?: string | null
    appliedAt?: Date | string
  }

  export type ImportJobCreateOrConnectWithoutDeckInput = {
    where: ImportJobWhereUniqueInput
    create: XOR<ImportJobCreateWithoutDeckInput, ImportJobUncheckedCreateWithoutDeckInput>
  }

  export type ImportJobCreateManyDeckInputEnvelope = {
    data: ImportJobCreateManyDeckInput | ImportJobCreateManyDeckInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDecksInput = {
    update: XOR<UserUpdateWithoutDecksInput, UserUncheckedUpdateWithoutDecksInput>
    create: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDecksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDecksInput, UserUncheckedUpdateWithoutDecksInput>
  }

  export type UserUpdateWithoutDecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cardStates?: UserCardStateUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cardStates?: UserCardStateUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CardUpsertWithWhereUniqueWithoutDeckInput = {
    where: CardWhereUniqueInput
    update: XOR<CardUpdateWithoutDeckInput, CardUncheckedUpdateWithoutDeckInput>
    create: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput>
  }

  export type CardUpdateWithWhereUniqueWithoutDeckInput = {
    where: CardWhereUniqueInput
    data: XOR<CardUpdateWithoutDeckInput, CardUncheckedUpdateWithoutDeckInput>
  }

  export type CardUpdateManyWithWhereWithoutDeckInput = {
    where: CardScalarWhereInput
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyWithoutDeckInput>
  }

  export type CardScalarWhereInput = {
    AND?: CardScalarWhereInput | CardScalarWhereInput[]
    OR?: CardScalarWhereInput[]
    NOT?: CardScalarWhereInput | CardScalarWhereInput[]
    id?: StringFilter<"Card"> | string
    deckId?: StringFilter<"Card"> | string
    externalRowId?: StringNullableFilter<"Card"> | string | null
    armenianScript?: StringFilter<"Card"> | string
    translit?: StringFilter<"Card"> | string
    englishMeaning?: StringFilter<"Card"> | string
    exampleSentence?: StringNullableFilter<"Card"> | string | null
    exampleTranslation?: StringNullableFilter<"Card"> | string | null
    grammar?: StringNullableFilter<"Card"> | string | null
    cheatPhrase?: StringNullableFilter<"Card"> | string | null
    topic?: StringNullableFilter<"Card"> | string | null
    difficultyBase?: IntNullableFilter<"Card"> | number | null
    isActive?: BoolFilter<"Card"> | boolean
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
  }

  export type ImportJobUpsertWithWhereUniqueWithoutDeckInput = {
    where: ImportJobWhereUniqueInput
    update: XOR<ImportJobUpdateWithoutDeckInput, ImportJobUncheckedUpdateWithoutDeckInput>
    create: XOR<ImportJobCreateWithoutDeckInput, ImportJobUncheckedCreateWithoutDeckInput>
  }

  export type ImportJobUpdateWithWhereUniqueWithoutDeckInput = {
    where: ImportJobWhereUniqueInput
    data: XOR<ImportJobUpdateWithoutDeckInput, ImportJobUncheckedUpdateWithoutDeckInput>
  }

  export type ImportJobUpdateManyWithWhereWithoutDeckInput = {
    where: ImportJobScalarWhereInput
    data: XOR<ImportJobUpdateManyMutationInput, ImportJobUncheckedUpdateManyWithoutDeckInput>
  }

  export type ImportJobScalarWhereInput = {
    AND?: ImportJobScalarWhereInput | ImportJobScalarWhereInput[]
    OR?: ImportJobScalarWhereInput[]
    NOT?: ImportJobScalarWhereInput | ImportJobScalarWhereInput[]
    id?: StringFilter<"ImportJob"> | string
    deckId?: StringFilter<"ImportJob"> | string
    mode?: StringFilter<"ImportJob"> | string
    fileName?: StringFilter<"ImportJob"> | string
    fileHash?: StringFilter<"ImportJob"> | string
    rowsParsed?: IntFilter<"ImportJob"> | number
    rowsInserted?: IntFilter<"ImportJob"> | number
    rowsUpdated?: IntFilter<"ImportJob"> | number
    rowsSkipped?: IntFilter<"ImportJob"> | number
    errors?: StringNullableFilter<"ImportJob"> | string | null
    appliedAt?: DateTimeFilter<"ImportJob"> | Date | string
  }

  export type DeckCreateWithoutCardsInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    owner: UserCreateNestedOneWithoutDecksInput
    imports?: ImportJobCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutCardsInput = {
    id?: string
    ownerId: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    imports?: ImportJobUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutCardsInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
  }

  export type UserCardStateCreateWithoutCardInput = {
    id?: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCardStatesInput
    reviews?: ReviewLogCreateNestedManyWithoutUserCardStateInput
  }

  export type UserCardStateUncheckedCreateWithoutCardInput = {
    id?: string
    userId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewLogUncheckedCreateNestedManyWithoutUserCardStateInput
  }

  export type UserCardStateCreateOrConnectWithoutCardInput = {
    where: UserCardStateWhereUniqueInput
    create: XOR<UserCardStateCreateWithoutCardInput, UserCardStateUncheckedCreateWithoutCardInput>
  }

  export type UserCardStateCreateManyCardInputEnvelope = {
    data: UserCardStateCreateManyCardInput | UserCardStateCreateManyCardInput[]
    skipDuplicates?: boolean
  }

  export type ReviewLogCreateWithoutCardInput = {
    id?: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewLogsInput
    userCardState: UserCardStateCreateNestedOneWithoutReviewsInput
  }

  export type ReviewLogUncheckedCreateWithoutCardInput = {
    id?: string
    userId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type ReviewLogCreateOrConnectWithoutCardInput = {
    where: ReviewLogWhereUniqueInput
    create: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput>
  }

  export type ReviewLogCreateManyCardInputEnvelope = {
    data: ReviewLogCreateManyCardInput | ReviewLogCreateManyCardInput[]
    skipDuplicates?: boolean
  }

  export type DeckUpsertWithoutCardsInput = {
    update: XOR<DeckUpdateWithoutCardsInput, DeckUncheckedUpdateWithoutCardsInput>
    create: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
    where?: DeckWhereInput
  }

  export type DeckUpdateToOneWithWhereWithoutCardsInput = {
    where?: DeckWhereInput
    data: XOR<DeckUpdateWithoutCardsInput, DeckUncheckedUpdateWithoutCardsInput>
  }

  export type DeckUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: UserUpdateOneRequiredWithoutDecksNestedInput
    imports?: ImportJobUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    imports?: ImportJobUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type UserCardStateUpsertWithWhereUniqueWithoutCardInput = {
    where: UserCardStateWhereUniqueInput
    update: XOR<UserCardStateUpdateWithoutCardInput, UserCardStateUncheckedUpdateWithoutCardInput>
    create: XOR<UserCardStateCreateWithoutCardInput, UserCardStateUncheckedCreateWithoutCardInput>
  }

  export type UserCardStateUpdateWithWhereUniqueWithoutCardInput = {
    where: UserCardStateWhereUniqueInput
    data: XOR<UserCardStateUpdateWithoutCardInput, UserCardStateUncheckedUpdateWithoutCardInput>
  }

  export type UserCardStateUpdateManyWithWhereWithoutCardInput = {
    where: UserCardStateScalarWhereInput
    data: XOR<UserCardStateUpdateManyMutationInput, UserCardStateUncheckedUpdateManyWithoutCardInput>
  }

  export type ReviewLogUpsertWithWhereUniqueWithoutCardInput = {
    where: ReviewLogWhereUniqueInput
    update: XOR<ReviewLogUpdateWithoutCardInput, ReviewLogUncheckedUpdateWithoutCardInput>
    create: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput>
  }

  export type ReviewLogUpdateWithWhereUniqueWithoutCardInput = {
    where: ReviewLogWhereUniqueInput
    data: XOR<ReviewLogUpdateWithoutCardInput, ReviewLogUncheckedUpdateWithoutCardInput>
  }

  export type ReviewLogUpdateManyWithWhereWithoutCardInput = {
    where: ReviewLogScalarWhereInput
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyWithoutCardInput>
  }

  export type UserCreateWithoutCardStatesInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    decks?: DeckCreateNestedManyWithoutOwnerInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCardStatesInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    decks?: DeckUncheckedCreateNestedManyWithoutOwnerInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCardStatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCardStatesInput, UserUncheckedCreateWithoutCardStatesInput>
  }

  export type CardCreateWithoutUserStatesInput = {
    id?: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deck: DeckCreateNestedOneWithoutCardsInput
    reviews?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutUserStatesInput = {
    id?: string
    deckId: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutUserStatesInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutUserStatesInput, CardUncheckedCreateWithoutUserStatesInput>
  }

  export type ReviewLogCreateWithoutUserCardStateInput = {
    id?: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewLogsInput
    card: CardCreateNestedOneWithoutReviewsInput
  }

  export type ReviewLogUncheckedCreateWithoutUserCardStateInput = {
    id?: string
    userId: string
    cardId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type ReviewLogCreateOrConnectWithoutUserCardStateInput = {
    where: ReviewLogWhereUniqueInput
    create: XOR<ReviewLogCreateWithoutUserCardStateInput, ReviewLogUncheckedCreateWithoutUserCardStateInput>
  }

  export type ReviewLogCreateManyUserCardStateInputEnvelope = {
    data: ReviewLogCreateManyUserCardStateInput | ReviewLogCreateManyUserCardStateInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCardStatesInput = {
    update: XOR<UserUpdateWithoutCardStatesInput, UserUncheckedUpdateWithoutCardStatesInput>
    create: XOR<UserCreateWithoutCardStatesInput, UserUncheckedCreateWithoutCardStatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCardStatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCardStatesInput, UserUncheckedUpdateWithoutCardStatesInput>
  }

  export type UserUpdateWithoutCardStatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    decks?: DeckUpdateManyWithoutOwnerNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCardStatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    decks?: DeckUncheckedUpdateManyWithoutOwnerNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CardUpsertWithoutUserStatesInput = {
    update: XOR<CardUpdateWithoutUserStatesInput, CardUncheckedUpdateWithoutUserStatesInput>
    create: XOR<CardCreateWithoutUserStatesInput, CardUncheckedCreateWithoutUserStatesInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutUserStatesInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutUserStatesInput, CardUncheckedUpdateWithoutUserStatesInput>
  }

  export type CardUpdateWithoutUserStatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
    reviews?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutUserStatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type ReviewLogUpsertWithWhereUniqueWithoutUserCardStateInput = {
    where: ReviewLogWhereUniqueInput
    update: XOR<ReviewLogUpdateWithoutUserCardStateInput, ReviewLogUncheckedUpdateWithoutUserCardStateInput>
    create: XOR<ReviewLogCreateWithoutUserCardStateInput, ReviewLogUncheckedCreateWithoutUserCardStateInput>
  }

  export type ReviewLogUpdateWithWhereUniqueWithoutUserCardStateInput = {
    where: ReviewLogWhereUniqueInput
    data: XOR<ReviewLogUpdateWithoutUserCardStateInput, ReviewLogUncheckedUpdateWithoutUserCardStateInput>
  }

  export type ReviewLogUpdateManyWithWhereWithoutUserCardStateInput = {
    where: ReviewLogScalarWhereInput
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyWithoutUserCardStateInput>
  }

  export type UserCreateWithoutReviewLogsInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    decks?: DeckCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewLogsInput = {
    id?: string
    email?: string | null
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    decks?: DeckUncheckedCreateNestedManyWithoutOwnerInput
    cardStates?: UserCardStateUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
  }

  export type CardCreateWithoutReviewsInput = {
    id?: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deck: DeckCreateNestedOneWithoutCardsInput
    userStates?: UserCardStateCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutReviewsInput = {
    id?: string
    deckId: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userStates?: UserCardStateUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutReviewsInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutReviewsInput, CardUncheckedCreateWithoutReviewsInput>
  }

  export type UserCardStateCreateWithoutReviewsInput = {
    id?: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCardStatesInput
    card: CardCreateNestedOneWithoutUserStatesInput
  }

  export type UserCardStateUncheckedCreateWithoutReviewsInput = {
    id?: string
    userId: string
    cardId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCardStateCreateOrConnectWithoutReviewsInput = {
    where: UserCardStateWhereUniqueInput
    create: XOR<UserCardStateCreateWithoutReviewsInput, UserCardStateUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpsertWithoutReviewLogsInput = {
    update: XOR<UserUpdateWithoutReviewLogsInput, UserUncheckedUpdateWithoutReviewLogsInput>
    create: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewLogsInput, UserUncheckedUpdateWithoutReviewLogsInput>
  }

  export type UserUpdateWithoutReviewLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    decks?: DeckUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    decks?: DeckUncheckedUpdateManyWithoutOwnerNestedInput
    cardStates?: UserCardStateUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CardUpsertWithoutReviewsInput = {
    update: XOR<CardUpdateWithoutReviewsInput, CardUncheckedUpdateWithoutReviewsInput>
    create: XOR<CardCreateWithoutReviewsInput, CardUncheckedCreateWithoutReviewsInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutReviewsInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutReviewsInput, CardUncheckedUpdateWithoutReviewsInput>
  }

  export type CardUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
    userStates?: UserCardStateUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userStates?: UserCardStateUncheckedUpdateManyWithoutCardNestedInput
  }

  export type UserCardStateUpsertWithoutReviewsInput = {
    update: XOR<UserCardStateUpdateWithoutReviewsInput, UserCardStateUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCardStateCreateWithoutReviewsInput, UserCardStateUncheckedCreateWithoutReviewsInput>
    where?: UserCardStateWhereInput
  }

  export type UserCardStateUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserCardStateWhereInput
    data: XOR<UserCardStateUpdateWithoutReviewsInput, UserCardStateUncheckedUpdateWithoutReviewsInput>
  }

  export type UserCardStateUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCardStatesNestedInput
    card?: CardUpdateOneRequiredWithoutUserStatesNestedInput
  }

  export type UserCardStateUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeckCreateWithoutImportsInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    owner: UserCreateNestedOneWithoutDecksInput
    cards?: CardCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutImportsInput = {
    id?: string
    ownerId: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutImportsInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutImportsInput, DeckUncheckedCreateWithoutImportsInput>
  }

  export type DeckUpsertWithoutImportsInput = {
    update: XOR<DeckUpdateWithoutImportsInput, DeckUncheckedUpdateWithoutImportsInput>
    create: XOR<DeckCreateWithoutImportsInput, DeckUncheckedCreateWithoutImportsInput>
    where?: DeckWhereInput
  }

  export type DeckUpdateToOneWithWhereWithoutImportsInput = {
    where?: DeckWhereInput
    data: XOR<DeckUpdateWithoutImportsInput, DeckUncheckedUpdateWithoutImportsInput>
  }

  export type DeckUpdateWithoutImportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: UserUpdateOneRequiredWithoutDecksNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutImportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type AccountCreateManyUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeckCreateManyOwnerInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceFingerprint?: string | null
  }

  export type UserCardStateCreateManyUserInput = {
    id?: string
    cardId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewLogCreateManyUserInput = {
    id?: string
    cardId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeckUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: CardUpdateManyWithoutDeckNestedInput
    imports?: ImportJobUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
    imports?: ImportJobUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCardStateUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutUserStatesNestedInput
    reviews?: ReviewLogUpdateManyWithoutUserCardStateNestedInput
  }

  export type UserCardStateUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewLogUncheckedUpdateManyWithoutUserCardStateNestedInput
  }

  export type UserCardStateUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutReviewsNestedInput
    userCardState?: UserCardStateUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    userCardStateId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    userCardStateId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardCreateManyDeckInput = {
    id?: string
    externalRowId?: string | null
    armenianScript: string
    translit: string
    englishMeaning: string
    exampleSentence?: string | null
    exampleTranslation?: string | null
    grammar?: string | null
    cheatPhrase?: string | null
    topic?: string | null
    difficultyBase?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportJobCreateManyDeckInput = {
    id?: string
    mode: string
    fileName: string
    fileHash: string
    rowsParsed: number
    rowsInserted: number
    rowsUpdated: number
    rowsSkipped: number
    errors?: string | null
    appliedAt?: Date | string
  }

  export type CardUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userStates?: UserCardStateUpdateManyWithoutCardNestedInput
    reviews?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userStates?: UserCardStateUncheckedUpdateManyWithoutCardNestedInput
    reviews?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateManyWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRowId?: NullableStringFieldUpdateOperationsInput | string | null
    armenianScript?: StringFieldUpdateOperationsInput | string
    translit?: StringFieldUpdateOperationsInput | string
    englishMeaning?: StringFieldUpdateOperationsInput | string
    exampleSentence?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: NullableStringFieldUpdateOperationsInput | string | null
    cheatPhrase?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    difficultyBase?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportJobUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportJobUncheckedUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportJobUncheckedUpdateManyWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileHash?: StringFieldUpdateOperationsInput | string
    rowsParsed?: IntFieldUpdateOperationsInput | number
    rowsInserted?: IntFieldUpdateOperationsInput | number
    rowsUpdated?: IntFieldUpdateOperationsInput | number
    rowsSkipped?: IntFieldUpdateOperationsInput | number
    errors?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardStateCreateManyCardInput = {
    id?: string
    userId: string
    easeFactor?: number
    interval?: number
    repetitions?: number
    lapses?: number
    dueAt?: Date | string
    lastReviewedAt?: Date | string | null
    isForwardLearned?: boolean
    isReverseLearned?: boolean
    isMastered?: boolean
    suspendedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewLogCreateManyCardInput = {
    id?: string
    userId: string
    userCardStateId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type UserCardStateUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCardStatesNestedInput
    reviews?: ReviewLogUpdateManyWithoutUserCardStateNestedInput
  }

  export type UserCardStateUncheckedUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewLogUncheckedUpdateManyWithoutUserCardStateNestedInput
  }

  export type UserCardStateUncheckedUpdateManyWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    easeFactor?: FloatFieldUpdateOperationsInput | number
    interval?: IntFieldUpdateOperationsInput | number
    repetitions?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isForwardLearned?: BoolFieldUpdateOperationsInput | boolean
    isReverseLearned?: BoolFieldUpdateOperationsInput | boolean
    isMastered?: BoolFieldUpdateOperationsInput | boolean
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewLogsNestedInput
    userCardState?: UserCardStateUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewLogUncheckedUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userCardStateId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userCardStateId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogCreateManyUserCardStateInput = {
    id?: string
    userId: string
    cardId: string
    direction: string
    grade: number
    responseTime?: number | null
    scheduledBefore: Date | string
    scheduledAfter: Date | string
    createdAt?: Date | string
  }

  export type ReviewLogUpdateWithoutUserCardStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewLogsNestedInput
    card?: CardUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewLogUncheckedUpdateWithoutUserCardStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyWithoutUserCardStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    scheduledBefore?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}