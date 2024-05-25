export interface saveUserPreferencesModel {
    uid: string,
    donationlimit: number,
    donationpref: string
}

export interface SignInRequest {
    email: string,
    password: string
}

export interface getUserPreferencesModel {
    uid: string,
    donationlimit: number,
    donationpref: string
}