import posts from '__fixtures__/posts.json'

export const getPosts = async (req, res) => {
  const myPosts = Array.from(posts).filter((post) => post.username === req.user.username)
  if (!myPosts) return res.status(404).send('No posts found')

  return res.status(200).json({ posts: myPosts })
}
