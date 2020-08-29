export const getTokenAndHandleFromParams = (params) => {
    const handleAndToken = {}
    handleAndToken.handle = params.split('&token=')[0]
    handleAndToken.token = params.split('&token=')[1] === 'null' ? null : params.split('&token=')[1]

    return handleAndToken
}