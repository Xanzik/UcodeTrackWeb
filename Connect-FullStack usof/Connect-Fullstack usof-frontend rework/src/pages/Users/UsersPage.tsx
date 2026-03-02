import { useMemo } from "react";
import styles from "./UsersPage.module.css";
import { useGetAllUsersQuery } from "@/entities/user/api/userApi.ts";
import { Search } from "@/features/search/Search";
import { Heading } from "@/shared/ui/Heading";
import { Subtitle } from "@/shared/ui/Subtitle";
import { Badge } from "@/shared/ui/Badge";
import { Select } from "@/shared/ui/Select";
import { Button } from "@/shared/ui/Button";
import { Status } from "@/shared/ui/Status";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { useSearchParam } from "@/features/search/model/useSearchParam.ts";

export function UsersPage() {
  const [userSearch, setUserSearch] = useSearchParam("userSearch");
  const [usersSearch, setUsersSearch] = useSearchParam("q");

  const {
    data: users,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllUsersQuery();

  const usersStats = useMemo(() => {
    const total = users?.length ?? 0;
    const admins = users?.filter((user) => user.role === "admin").length ?? 0;
    const members = total - admins;

    return { total, admins, members };
  }, [users]);

  // const isEmpty = !isLoading && !isError;

  return (
    <div className={styles["page"]}>
      <div className={styles["page__header"]}>
        <div className={styles["page__header-top"]}>
          <Heading>USERS</Heading>
          <Subtitle>COMMUNITY DIRECTORY</Subtitle>
        </div>

        <div className={styles["page__stats"]}>
          <Badge>TOTAL {usersStats.total}</Badge>
          <Badge>ADMINS {usersStats.admins}</Badge>
          <Badge>MEMBERS {usersStats.members}</Badge>
        </div>

        <div className={styles["page__controls"]}>
          <Search
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Search by login, email or full name..."
          />

          <div className={styles["page__controls-sort"]}>
            <Select
              value={usersSearch}
              onChange={(event) => setUsersSearch(event.target.value)}
              options={[
                { label: "Like", value: "date" },
                { label: "Dislike", value: "date2" },
              ]}
            />
          </div>

          <Button onClick={() => void refetch()} disabled={isFetching}>
            {isFetching ? "REFRESHING..." : "REFRESH"}
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className={styles["state"]}>
          <Subtitle variant="light">Loading users...</Subtitle>
        </div>
      )}

      {isError && (
        <div className={styles["state"]}>
          <Subtitle variant="light">Failed to load users list.</Subtitle>
          <Button onClick={() => void refetch()}>TRY AGAIN</Button>
        </div>
      )}

      {/*{isEmpty && (*/}
      {/*  <div className={styles["state"]}>*/}
      {/*    <Subtitle variant="light">*/}
      {/*      {search.value.trim()*/}
      {/*        ? "No users found for current search query."*/}
      {/*        : "No users available yet."}*/}
      {/*    </Subtitle>*/}
      {/*  </div>*/}
      {/*)}*/}

      {!isLoading && !isError && users && users.length > 0 && (
        <div className={styles["users__grid"]}>
          {users.map((user) => (
            <article key={user.id} className={styles["user__card"]}>
              <div className={styles["user__card-top"]}>
                <div className={styles["user__card-identity"]}>
                  <UserAvatar src={user.profilePicture} fallback={user.login} />
                  <div className={styles["user__card-title"]}>
                    <h3 className={styles["user__login"]}>{user.login}</h3>
                    {user.fullName && (
                      <Subtitle variant="light">{user.fullName}</Subtitle>
                    )}
                    <Status
                      status={user.role === "admin" ? "online" : "offline"}
                      text={user.role.toUpperCase()}
                    />
                  </div>
                </div>
              </div>

              <div className={styles["user__card-bottom"]}>
                <p className={styles["user__email"]}>{user.email}</p>
                <p className={styles["user__rating"]}>{user.rating}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
