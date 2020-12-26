export function joinClass(arg1: string, option: { [key: string]: boolean } = {}) {
    const classNames = [arg1]
    Object.keys(option).forEach((x) => {
        if (option[x]) classNames.push(x)
    })
    return classNames.join(" ")
}