/* refresh hax */

/* @ts-expect-error */
globalThis.$RefreshReg$ = globalThis.$RefreshSig$ || (() => {});
/* @ts-expect-error */
globalThis.$RefreshSig$ = globalThis.$RefreshSig$ || (() => () => {});
/* @ts-expect-error */
globalThis.$RefreshRuntime$ = globalThis.$RefreshRuntime$ || ({
	register: () => {}
});