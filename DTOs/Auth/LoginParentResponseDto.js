class LoginParentResponseDto
{
    constructor(parentDto, authToken)
    {
        this.parentDto = parentDto;
        this.authToken = authToken;
    }
}

export default LoginParentResponseDto;