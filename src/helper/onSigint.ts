const sigs = ['SIGINT', 'SIGTERM'] as const

export const onSigint = (cb: () => void) =>
    sigs.forEach(sig => process.on(sig, cb))
