+ /**
+  * This module contains functions to search the database.
+  * @module
+  */
  
  /** The options bag to pass to the {@link search} method. */
  export interface SearchOptions {}
  
  /** Search the database with the given query. */
  export function search(query: string, options?: SearchOptions): string[];
