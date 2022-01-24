interface User {
    id: number;
    active: boolean;
    admin: boolean;
    username: string;
    password: string;
};

interface Post {
    [index: number]: {
        id: number;
        title: string
        poster: string;
        body: string;
        img: string;
    }
};

interface Comment {
    [index: number]: {
        sectionid: number;
        commenter: string
        body: string;
    }
};
