export function sdiff(ours, ...theirs) {
  if (this.data.has(ours) && !(this.data.get(ours) instanceof Set)) {
    throw new Error(`Key ${ours} does not contain a set`)
  }
  theirs.forEach(key => {
    if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
      throw new Error(`Key ${key} does not contain a set`)
    }
  })

  const ourSet = this.data.has(ours) ? this.data.get(ours) : new Set()
  const theirSets = theirs.map(key =>
    this.data.has(key) ? this.data.get(key) : new Set()
  )
  const difference = new Set(
    Array.from(ourSet).filter(ourValue =>
      theirSets.reduce(
        (isUnique, set) => (set.has(ourValue) ? false : isUnique),
        /* isUnique */ true
      )
    )
  )

  return Array.from(difference)
}

export function sdiffBuffer(...args) {
  const val = sdiff.apply(this, args)
  return val.map(Buffer.from)
}
