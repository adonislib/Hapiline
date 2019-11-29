import * as Async from "react-async";
import {AxiosResponse} from "axios";

import {ApiError, ApiErrorInterface, ArgError} from "../services/api";

type getArgErrorType = (path: string) => ArgError | undefined;

interface _ResponseError {
	responseStatus: AxiosResponse["status"];
	errorCode: ApiErrorInterface["code"];
	errorMessage: ApiErrorInterface["message"];
	argErrors: ApiErrorInterface["argErrors"];
}

interface ResponseError extends Partial<_ResponseError> {
	getArgError: getArgErrorType;
}

export function useRequestErrors<T>(state: Async.AsyncState<T>): ResponseError {
	const error = state.error as ApiError | undefined;

	const responseStatus = error && error.response && error.response.status;

	const errorCode =
		error && error.response && error.response.data && error.response.data.code;

	const errorMessage =
		error &&
		error.response &&
		error.response.data &&
		error.response.data.message;

	const argErrors =
		error &&
		error.response &&
		error.response.data &&
		error.response.data.argErrors;

	const getArgError: getArgErrorType = field =>
		argErrors && argErrors.find(argError => argError.field === field);

	return {
		responseStatus,
		errorCode,
		errorMessage,
		argErrors,
		getArgError,
	};
}
