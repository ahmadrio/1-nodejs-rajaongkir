exports.success = (values, res) => {
    const data = {
        'status': 200,
        'message': 'Success',
        'data': values
    }

    res.status(200).json(data)
    res.end()
}

exports.failed = (message, res, code = 500) => {
    const data = {
        'status': code,
        'message': message,
        'data': []
    }

    res.status(code).json(data)
    res.end()
}
