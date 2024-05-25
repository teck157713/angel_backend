export interface saveUserPreferences {
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
    firstName: string,
    lastName: string,
    email: string,
    donationlimit: number,
    donationpref: string
}