const handleError = (error:any)=>{
    return error instanceof Error ? error.message : "Something went wrong";
}

const headers = {
    "Content-Type" : "application/json"
}


//auth
export async function register(firstName: string, middleName: string, lastName: string, extName: string, email: string, password: string) {
    try {
        const req = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers,
            body: JSON.stringify({firstName, middleName, lastName, extName, email, password})
        });
        const data = await req.json();
        if(!data.success) return { success: false, message: data.message};
        return data;
    } catch (error) {
        return { success: false, message: handleError(error)}
    }
}

export async function login(email: string, password: string) {
    try {
        const req = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers,
            body: JSON.stringify({email, password})
        });
        const data = await req.json();
        if(!data.success) return { success: false, message: data.message};
        return data;
    } catch (error) {
        return { success: false, message: handleError(error)}
    }
}
//end of auth

//org
export async function getOrganizations(){
    try {
        const req = await fetch(`/api/v1/organizations`, {
            method: "GET",
            headers
        });
        const data = await req.json();
        if(!data.success) return { success: false, message: data.message};
        return data;
    } catch (error) {
        return { success: false, message: handleError(error)}
    }
}

export async function createOrganization(name:string, type:string, admin?:string){
    try {
        const req = await fetch(`/api/v1/organizations`, {
            method: "POST",
            headers,
            body: JSON.stringify({name, type, admin})
        });
        const data = await req.json();
        if(!data.success) return { success: false, message: data.message};
        return data;
    } catch (error) {
        return { success: false, message: handleError(error)}
    }
}
//end of org