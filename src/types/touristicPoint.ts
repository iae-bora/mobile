interface Route {
    id: number;
    touristPoints: Array<TouristPoint>;
}

interface TouristPoint {
    distanceFromOrigin: number;
    startHour: string;
    endHour: string;
    index: number;
    id: number;
    openingHours: {
        place: {
            address: string;
            category: number;
            image: string | null;
            name: string;
            rating: string;
            resturantCategory: string | null;
        }
    }
}

export { Route, TouristPoint }