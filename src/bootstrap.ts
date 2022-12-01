import { getRepository } from "typeorm";
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User";

export const Bootstrap = async () => {
  const userRepo = getRepository(User);
  const user = userRepo.create({
    firstName: "Alex",
    lastName: "Brooks",
    age: 22,
  });
  await userRepo.save(user).catch((err) => {
    console.log("Error: ", err);
  });
  console.log("New User Saved", user);

  const tweetRepo = getRepository(Tweet);
  const tweet = new Tweet();
  tweet.title = "I Finally git a new Job!";
  tweet.content = "Welll after a long time I landed my dream job on Netflix";
  tweet.user = user;
  await tweetRepo.save(tweet).catch((err) => console.log(err));
};

export const find = async () => {
  const userRepo = getRepository(User);

  const user = await userRepo
    .findOne({ where: { firstName: "Alex" } })
    .catch((err) => {
      console.log(err);
    });

  if (user) console.log("User: ", user);
};