import { interpret as interpretVtl } from '@inseefr/vtl-tools';

export const interpret = features => bindings => expression => {
	if (!expression) return '';
	if (!Array.isArray(features)) return expression;
	if (features.includes('VTL')) {
		try {
			const replacedBindings = replaceNullBindings(bindings);
			const VTLExpr = interpretVtl(expression, replacedBindings);
			if (!VTLExpr) return expression;
			return VTLExpr;
		} catch (e) {
			return expression;
		}
	}
	return expression;
};

export const replaceNullBindings = bindings =>
	bindings
		? Object.entries(bindings).reduce(
				(acc, [key, value]) => ({
					...acc,
					[key]: value === null ? key : value,
				}),
				{}
		  )
		: {};
