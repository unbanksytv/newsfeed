import Form from "@/components/form";
import PostFeed from "@/components/post/postFeed";
import Header from "@/components/sideBar/header";

export default function Home() {
  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What's Happening" />
      <PostFeed />
    </div>
  );
}
