export function textellipsis(str: string = "", len: number): string {
    if (str.length > len && str.charAt(len - 1) === " ") {
        len -= 1
        return textellipsis(str, len)
    }

    return str.length > len ? `${str.substr(0, len)}...` : str
}