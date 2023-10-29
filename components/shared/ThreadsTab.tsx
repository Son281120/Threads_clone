import { fetchUserPosts } from "@/lib/actions/use.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

interface Result {
    name: string;
    image: string;
    id: string;
    threads: {
        _id: string;
        text: string;
        parentId: string | null;
        author: {
            name: string;
            image: string;
            id: string;
        };
        community: {
            id: string;
            name: string;
            image: string;
        } | null;
        createdAt: string;
        children: {
            author: {
                image: string;
            };
        }[];
    }[];
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
    //TODO: Fetch Profile threads
    let result: Result;

    result = await fetchUserPosts(accountId);

    if (!result) redirect("/")
    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                    key={thread.id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                            ? { name: result.name, image: result.image, id: result.id }
                            : {
                                name: thread.author.name,
                                image: thread.author.image,
                                id: thread.author.id,
                            }
                    }  //todo
                    createdAt={thread.createdAt}    //todo
                    community={thread.community}
                    comments={thread.children}
                />
            ))}
        </section>
    )
}

export default ThreadsTab;