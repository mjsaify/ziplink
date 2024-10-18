export const GenerateShortUri = async (url) => {
    try {
        const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/url/short-url`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: url }),
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error)
    }
};

export const SignupUser = async (formData) =>{
    try {
        const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/user/signup`, {
            method: "post",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const response = await request.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
    }
}