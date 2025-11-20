// import { cookies } from "next/headers";

// /**
//  * Custom error class for HTTP fetch errors
//  */
// export class HttpFetchError extends Error {
//   public readonly status: number;
//   public readonly statusText: string;
//   public readonly url: string;

//   constructor(
//     message: string,
//     status: number,
//     statusText: string,
//     url: string
//   ) {
//     super(message);
//     this.name = "HttpFetchError";
//     this.status = status;
//     this.statusText = statusText;
//     this.url = url;
//     Object.setPrototypeOf(this, HttpFetchError.prototype);
//   }
// }

// /**
//  * Type definitions for fetch responses
//  */
// interface SuccessResponse<T = unknown> {
//   success: true;
//   data: T;
//   status: number;
//   statusText: string;
//   headers: Headers;
//   url: string;
// }

// interface ErrorResponse {
//   success: false;
//   error: {
//     message: string;
//     status: number;
//     statusText: string;
//     url: string;
//     originalError: unknown;
//   };
//   data: null;
//   status: number;
//   statusText: string;
// }

// type FetchResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// /**
//  * Server-side fetch utility class
//  */
// export class ServerFetch {
//   private static readonly VALID_METHODS = [
//     "GET",
//     "POST",
//     "PUT",
//     "PATCH",
//     "DELETE",
//     "HEAD",
//     "OPTIONS",
//   ] as const;

//   /**
//    * Helper to safely extract error messages from non-OK responses
//    */
//   private static async safeGetErrorMessage(
//     response: Response
//   ): Promise<string> {
//     try {
//       const data = await response.json();
//       return data?.error || data?.message || response.statusText;
//     } catch {
//       return response.statusText;
//     }
//   }

//   /**
//    * Validates URL format
//    */
//   private static validateUrl(url: string): void {
//     if (!url || typeof url !== "string") {
//       throw new Error("URL must be a non-empty string");
//     }
//   }

//   /**
//    * Validates HTTP method
//    */

//   private static validateMethod(method: string): void {
//     const upperMethod = method.toUpperCase() as Uppercase<string>;
//     if (
//       !this.VALID_METHODS.includes(
//         upperMethod as (typeof this.VALID_METHODS)[number]
//       )
//     ) {
//       throw new Error(`Invalid HTTP method: ${method}`);
//     }
//   }

//   /**
//    * Builds full URL from base URL and relative path
//    */
//   private static buildFullUrl(url: string): string {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
//     return url.startsWith("http") ? url : `${baseUrl}${url}`;
//   }

//   /**
//    * Serializes cookies into a cookie header string
//    */
//   private static serializeCookies(
//     cookieStore: Awaited<ReturnType<typeof cookies>>
//   ): string {
//     return cookieStore
//       .getAll()
//       .map((c) => `${c.name}=${c.value}`)
//       .join("; ");
//   }

//   /**
//    * Parses response based on content type
//    */
//   private static async parseResponse(
//     response: Response
//   ): Promise<string | Blob | unknown> {
//     const contentType = response.headers.get("content-type");

//     if (contentType && contentType.includes("application/json")) {
//       return await response.json();
//     } else if (contentType && contentType.includes("text/")) {
//       return await response.text();
//     } else {
//       // For other content types (images, files, etc.), return blob
//       return await response.blob();
//     }
//   }

//   /**
//    * Creates a standardized error response object
//    */
//   private static createErrorResponse(
//     error: unknown,
//     url: string
//   ): ErrorResponse {
//     const errorMessage =
//       error instanceof Error
//         ? error.message
//         : typeof error === "string"
//         ? error
//         : "Network request failed";

//     const httpError = error instanceof HttpFetchError ? error : null;

//     return {
//       success: false,
//       error: {
//         message: errorMessage,
//         status: httpError?.status || 0,
//         statusText: httpError?.statusText || "Unknown Error",
//         url: url,
//         originalError: error,
//       },
//       data: null,
//       status: httpError?.status || 0,
//       statusText: httpError?.statusText || "Unknown Error",
//     };
//   }

//   /**
//    * Makes a server-side fetch with authentication.
//    * Throws if the user is not logged in (no auth_token cookie).
//    */
//   static async authenticatedFetch<T = unknown>(
//     url: string,
//     options: RequestInit = {}
//   ): Promise<T> {
//     const cookieStore = await cookies();

//     // Extract token
//     const token = cookieStore.get("auth_token")?.value;
//     if (!token) {
//       throw new Error("Unauthorized: Missing auth_token cookie");
//     }

//     // Build full URL
//     const fullUrl = this.buildFullUrl(url);

//     // Serialize all cookies for session continuity
//     const cookieHeader = this.serializeCookies(cookieStore);

//     // Perform fetch
//     const response = await fetch(fullUrl, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieHeader,
//         ...options.headers,
//       },
//     });

//     if (!response.ok) {
//       const message = await this.safeGetErrorMessage(response);
//       throw new HttpFetchError(
//         `HTTP ${response.status}: ${message}`,
//         response.status,
//         response.statusText,
//         fullUrl
//       );
//     }

//     // Return parsed JSON safely
//     return (await response.json()) as T;
//   }

//   /**
//    * Dynamic fetch with comprehensive error handling and response parsing
//    */
//   static async dynamicFetch(
//     url: string,
//     options: RequestInit = {}
//   ): Promise<FetchResponse> {
//     // Validate URL
//     this.validateUrl(url);

//     // Default options
//     const defaultOptions: RequestInit = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // Merge options
//     const fetchOptions: RequestInit = {
//       ...defaultOptions,
//       ...options,
//       headers: {
//         ...defaultOptions.headers,
//         ...options.headers,
//       },
//     };

//     // Validate HTTP method
//     const method = fetchOptions.method || "GET";
//     this.validateMethod(method);

//     try {
//       const response = await fetch(url, fetchOptions);

//       // Handle HTTP errors (4xx, 5xx status codes)
//       if (!response.ok) {
//         let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;

//         try {
//           // Try to get error details from response body
//           const errorData = await response.text();
//           if (errorData) {
//             errorMessage += ` - ${errorData}`;
//           }
//         } catch (parseError) {
//           // If we can't parse the error body, continue with basic error message
//           const errorMsg =
//             parseError instanceof Error
//               ? parseError.message
//               : "Unknown parse error";
//           console.warn("Could not parse error response body:", errorMsg);
//         }

//         throw new HttpFetchError(
//           errorMessage,
//           response.status,
//           response.statusText,
//           url
//         );
//       }

//       // Handle successful response
//       try {
//         const data = await this.parseResponse(response);

//         // Return standardized response object
//         return {
//           success: true,
//           data: data,
//           status: response.status,
//           statusText: response.statusText,
//           headers: response.headers,
//           url: response.url,
//         };
//       } catch (parseError) {
//         const errorMsg =
//           parseError instanceof Error
//             ? parseError.message
//             : "Failed to parse response";
//         throw new Error(`Failed to parse response: ${errorMsg}`);
//       }
//     } catch (error) {
//       // Handle network errors and other fetch failures
//       console.error("Fetch error:", error);

//       // Return standardized error object
//       return this.createErrorResponse(error, url);
//     }
//   }
// }

// /**
//  * Backward compatibility: Export functions that use the class methods
//  */
// export async function authenticatedServerFetch<T = unknown>(
//   url: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   return ServerFetch.authenticatedFetch<T>(url, options);
// }

// export async function dynamicFetch(
//   url: string,
//   options: RequestInit = {}
// ): Promise<FetchResponse> {
//   return ServerFetch.dynamicFetch(url, options);
// }
