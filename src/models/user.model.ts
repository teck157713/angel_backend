export interface saveUserPreferences {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    donationlimit: number,
    donationpref: string
}

export interface SignInRequest {
    email: string,
    password: string
}

export interface getUserPreferences {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    donationlimit: number,
    donationpref: string
}