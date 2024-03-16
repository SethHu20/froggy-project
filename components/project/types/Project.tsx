type ProjectProperty = {
    /**
     * The unique identifier for the project. Make sure this is unique!!
     * It is also used as the key for the project card in the project list.
     */
    id: number;
    /**
     * Use relative URL path without the domain, starting with forward slash.
     */
    url: string;
    title: string;
    description: string;
    /**
     * Use relative path from the root folder of froggy project.
     */
    image: string;
    category: ProjectCategory;
}

/**
 * The category of the project.
 * Used for filtering projects in the project list.
 */
type ProjectCategory = "game" | "web" | "app" | "other";