export default async function EntoliMultiPrompt (arr) {
    let response = [];
    for (let a of arr) {
        response.push(await a());
    }

    return response;
}