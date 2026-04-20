
import { get } from "node:http";    

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5162';


export const api = {
    //------------------- USERS ------------------//
    users: {
        create: `${API_BASE_URL}/users`, // POST

        getDetails: `${API_BASE_URL}/users/current`, // GET
        update: `${API_BASE_URL}/users/current`, // PUT
        deleteCurrent: `${API_BASE_URL}/users/current`, // DELETE
        updateEmailAddress: `${API_BASE_URL}/users/current/email-address`, // PUT
        updatePassword: `${API_BASE_URL}/users/current/password`, // PUT    
        updateStatus: `${API_BASE_URL}/users/current/status`, // PUT
        //deleteById: `${API_BASE_URL}/users/{id}`, // DELETE
        deleteById: (id: string | number) => `${API_BASE_URL}/users/${id}`,
    },
    //------------------- SESSIONS ------------------//
    sessions: {
        login: `${API_BASE_URL}/sessions`, // POST
        deleteAll: `${API_BASE_URL}/sessions`, // DELETE
        getDetails: `${API_BASE_URL}/sessions/current`, // GET
        refreshAccessToken: `${API_BASE_URL}/sessions/current`, // PUT
        logOut: `${API_BASE_URL}/sessions/current`, // DELETE
        deleteById: (id: string | number) => `${API_BASE_URL}/sessions/${id}`, // DELETE
    },
    //------------------- FEEDS ------------------//
    feeds: {
        list: `${API_BASE_URL}/feeds`, // GET
        create: `${API_BASE_URL}/feeds`, // POST
        getDetails: (slug: string) => `${API_BASE_URL}/feeds/${slug}`, // GET
        update: (slug: string) => `${API_BASE_URL}/feeds/${slug}`, // PUT
        delete: (slug: string) => `${API_BASE_URL}/feeds/${slug}`, // DELETE
        updateStatus: (slug: string) => `${API_BASE_URL}/feeds/${slug}/status`, // PUT
    },
    //------------------- TAGS ------------------//
    tags: {
        list: `${API_BASE_URL}/tags`, // GET
        create: `${API_BASE_URL}/tags`, // POST
        getDetails: (slug: string) => `${API_BASE_URL}/tags/${slug}`, // GET
        delete: (slug: string) => `${API_BASE_URL}/tags/${slug}`, // DELETE
        updateName: (slug: string) => `${API_BASE_URL}/tags/${slug}/name`, // PUT
    },
    //------------------- SUBSCRIPTIONS ------------------//
    subscriptions: {
        createArtist: `${API_BASE_URL}/subscriptions/artists`, // POST
        createLabel: `${API_BASE_URL}/subscriptions/labels`, // POST
        getArtist: (beatportSlug: string, beatportId: string) => `${API_BASE_URL}/subscriptions/artists/${beatportSlug}/${beatportId}`, // GET
        getLabel: (beatportSlug: string, beatportId: string) => `${API_BASE_URL}/subscriptions/labels/${beatportSlug}/${beatportId}`, // GET
        createArtistTag: (beatportSlug: string, beatportId: string) => `${API_BASE_URL}/subscriptions/artists/${beatportSlug}/${beatportId}/tags`, // POST
        deleteArtistTags: (beatportSlug: string, beatportId: string, tagSlug: string) => `${API_BASE_URL}/subscriptions/artists/${beatportSlug}/${beatportId}/tags/${tagSlug}`, // DELETE
        createLabelTag: (beatportSlug: string, beatportId: string) => `${API_BASE_URL}/subscriptions/labels/${beatportSlug}/${beatportId}/tags`, // POST
        deleteLabelTags: (beatportSlug: string, beatportId: string, tagSlug: string) => `${API_BASE_URL}/subscriptions/labels/${beatportSlug}/${beatportId}/tags/${tagSlug}`, // DELETE
        //deleteArtistTag: (beatportSlug: string, beatportId: string, tagSlug: string) => `${API_BASE_URL}/subscriptions/artists/${beatportSlug}/${beatportId}/tags/${tagSlug}`, // DELETE
        //deleteLabelTag: (beatportSlug: string, beatportId: string, tagSlug: string) => `${API_BASE_URL}/subscriptions/labels/${beatportSlug}/${beatportId}/tags/${tagSlug}`, // DELETE
        //neet to clarify about slur and tagSlug in delete endpoints
    },
} as const;






//------------------- TAGS ------------------//

//------------------- SUBSCRIPTIONS ------------------//