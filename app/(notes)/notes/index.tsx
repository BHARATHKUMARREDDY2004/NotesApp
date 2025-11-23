import { memo, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";
import { useNotes } from "@/context/NotesContext";
import ConfirmDialog from "@/components/ConfirmDialog";

const sortLabels: Record<string, string> = {
  "updatedAt-desc": "Last updated · Newest",
  "updatedAt-asc": "Last updated · Oldest",
  "title-asc": "Order · A → Z",
  "title-desc": "Order · Z → A",
};

const sortOptions: SortOption[] = [
  { key: "updatedAt", direction: "desc" },
  { key: "updatedAt", direction: "asc" },
  { key: "title", direction: "asc" },
  { key: "title", direction: "desc" },
];

const getSortKey = (option: SortOption) => `${option.key}-${option.direction}`;

const formatDate = (value: string) => {
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const NoteCard = ({
  note,
  onPress,
  onDelete,
}: {
  note: StoredNote;
  onPress: () => void;
  onDelete: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className="mb-4 flex-row items-center rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
  >
    {note.imageUri ? (
      <Image
        source={{ uri: note.imageUri }}
        className="h-16 w-16 rounded-2xl"
        resizeMode="cover"
      />
    ) : (
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-orange/10">
        <Text className="text-lg font-psemibold text-orange">
          {note.title.slice(0, 1).toUpperCase()}
        </Text>
      </View>
    )}

    <View className="ml-4 flex-1">
      <Text className="text-lg font-psemibold text-gray-900" numberOfLines={1}>
        {note.title}
      </Text>
      <Text className="mt-1 text-sm text-gray-500" numberOfLines={2}>
        {note.body || "No details yet."}
      </Text>
      <Text className="mt-2 text-xs text-gray-400">{formatDate(note.updatedAt)}</Text>
    </View>

    <Pressable
      onPress={onDelete}
      className="ml-4 rounded-full bg-gray-100/20 px-3 py-2"
      hitSlop={10}
    >
      <Text className="text-sm font-psemibold text-red-500">Delete</Text>
    </Pressable>
  </Pressable>
);

type NotesListHeaderProps = {
  username: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortLabel: string;
  onSortPress: () => void;
  onLogoutPress: () => void;
  onSwitchPress: () => void;
  canSwitchAccounts: boolean;
};

const NotesListHeader = memo(
  ({
    username,
    searchQuery,
    onSearchChange,
    sortLabel,
    onSortPress,
    onLogoutPress,
    onSwitchPress,
    canSwitchAccounts,
  }: NotesListHeaderProps) => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-psemibold text-gray-500">Welcome back ...!</Text>
          <Text className="text-2xl font-pbold text-gray-900">{username}</Text>
        </View>
        <View className="flex-row items-center gap-3">
          {canSwitchAccounts ? (
            <Pressable
              onPress={onSwitchPress}
              className="rounded-full border border-gray-200 px-4 py-2"
            >
              <Text className="text-sm font-psemibold text-gray-700">Switch</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={onLogoutPress}
            className="rounded-full border border-gray-200 px-4 py-2"
          >
            <Text className="text-sm font-psemibold text-gray-700">Logout</Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-6 rounded-3xl border border-gray-100 bg-gray-50 p-4">
        <Text className="text-sm font-psemibold text-gray-600">Search</Text>
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search by title or body"
          autoCorrect={false}
          autoCapitalize="none"
          className="mt-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900"
        />
        <Pressable
          onPress={onSortPress}
          className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-4 py-3"
        >
          <Text className="text-sm font-psemibold text-gray-700">Sort</Text>
          <Text className="text-sm text-gray-500">{sortLabel}</Text>
        </Pressable>
      </View>
    </View>
  )
);

NotesListHeader.displayName = "NotesListHeader";

const NotesListScreen = () => {
  const router = useRouter();
  const { currentUser, logout, users, switchAccount } = useAuth();
  const { notes, deleteNote, refreshNotes, isLoadingNotes } = useNotes();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>({
    key: "updatedAt",
    direction: "desc",
  });
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isSwitchModalVisible, setSwitchModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<StoredNote | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [switchError, setSwitchError] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const sortedNotes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = notes.filter((note) => {
      if (!normalizedQuery) return true;
      return (
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.body.toLowerCase().includes(normalizedQuery)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortOption.key === "updatedAt") {
        const diff = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        return sortOption.direction === "asc" ? diff : -diff;
      }

      if (sortOption.key === "title") {
        const comparison = a.title.localeCompare(b.title);
        return sortOption.direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });
  }, [notes, searchQuery, sortOption]);

  const requestDelete = (note: StoredNote) => {
    setDeleteError(null);
    setPendingDelete(note);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      setIsDeleting(true);
      await deleteNote(pendingDelete.id);
      setPendingDelete(null);
      setDeleteError(null);
    } catch (error) {
      console.error("Failed to delete note", error);
      setDeleteError("Unable to delete this note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    if (isDeleting) return;
    setDeleteError(null);
    setPendingDelete(null);
  };

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/(auth)/login");
  }, [logout, router]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshNotes();
    setIsRefreshing(false);
  };

  const openSortModal = useCallback(() => setSortModalVisible(true), [setSortModalVisible]);
  const openSwitchModal = useCallback(() => {
    if (!currentUser) {
      return;
    }
    setSwitchModalVisible(true);
  }, [currentUser, setSwitchModalVisible]);

  const handleSwitchAccount = useCallback(
    async (username: string) => {
      if (!currentUser) {
        setSwitchError("Log in before switching accounts.");
        return;
      }

      if (currentUser?.username === username) {
        setSwitchModalVisible(false);
        return;
      }

      try {
        setSwitchError(null);
        setIsSwitching(true);
        await switchAccount(username);
        setSwitchModalVisible(false);
        setSearchQuery("");
      } catch (error) {
        console.error("Failed to switch account", error);
        const message =
          error instanceof Error ? error.message : "Unable to switch accounts.";
        setSwitchError(message);
      } finally {
        setIsSwitching(false);
      }
    },
    [currentUser, switchAccount]
  );

  const headerElement = useMemo(
    () => (
      <NotesListHeader
        username={currentUser?.username ?? "Unknown"}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortLabel={sortLabels[getSortKey(sortOption)]}
        onSortPress={openSortModal}
        onLogoutPress={handleLogout}
        onSwitchPress={openSwitchModal}
        canSwitchAccounts={Boolean(currentUser) && users.length > 1}
      />
    ),
    [
      currentUser,
      searchQuery,
      sortOption,
      openSortModal,
      handleLogout,
      setSearchQuery,
      openSwitchModal,
      users.length,
    ]
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FA]">
      <FlatList
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        data={sortedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push({ pathname: "/(notes)/notes/[noteId]", params: { noteId: item.id } })}
            onDelete={() => requestDelete(item)}
          />
        )}
        ListHeaderComponent={headerElement}
        ListEmptyComponent={
          isLoadingNotes ? null : (
            <View className="mt-20 items-center">
              <Text className="text-lg font-psemibold text-gray-700">
                No notes yet
              </Text>
              <Text className="mt-2 text-center text-gray-500">
                Create your first note to get started ... !
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />

      {(isLoadingNotes || isRefreshing) && sortedNotes.length === 0 ? (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : null}

      <Pressable
        onPress={() => router.push("/(notes)/notes/new")}
        className="absolute bottom-10 right-6 rounded-full bg-orange px-6 py-4 shadow-lg"
      >
        <Text className="text-base font-psemibold text-white">New note</Text>
      </Pressable>

      <Modal
        transparent
        visible={isSortModalVisible}
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="flex-1 bg-black/40"
            onPress={() => setSortModalVisible(false)}
          />
          <View className="rounded-t-3xl bg-white p-6">
            <Text className="text-xl font-pbold text-gray-900">Sort notes</Text>
            {sortOptions.map((option) => {
              const key = getSortKey(option);
              const isSelected = key === getSortKey(sortOption);
              return (
                <Pressable
                  key={key}
                  onPress={() => {
                    setSortOption(option);
                    setSortModalVisible(false);
                  }}
                  className={`mt-4 p-2 flex-row items-center justify-between ${isSelected ? "opacity-100" : "opacity-60"}`}
                >
                  <Text className="text-lg font-psemibold text-gray-700">{sortLabels[key]}</Text>
                  {isSelected ? (
                    <View className="h-4 w-4 rounded-full bg-orange" />
                  ) : (
                    <View className="h-4 w-4 rounded-full border border-gray-300" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={isSwitchModalVisible}
        animationType="fade"
        onRequestClose={() => setSwitchModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="flex-1 bg-black/40"
            onPress={() => setSwitchModalVisible(false)}
          />
          <View className="rounded-t-3xl bg-white p-6">
            <Text className="text-xl font-pbold text-gray-900">Switch account</Text>
            <Text className="mt-1 text-sm text-gray-500">
              Pick another profile saved on this device.
            </Text>
            {switchError ? (
              <Text className="mt-3 text-sm text-red-500">{switchError}</Text>
            ) : null}
            <View className="mt-4">
              {users.map((user) => {
                const isActive = user.username === currentUser?.username;
                return (
                  <Pressable
                    key={user.username}
                    disabled={isActive || isSwitching}
                    onPress={() => handleSwitchAccount(user.username)}
                    className={`mb-3 flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
                      isActive ? "border-orange bg-orange/10" : "border-gray-200"
                    } ${isSwitching && !isActive ? "opacity-60" : ""}`}
                  >
                    <View>
                      <Text className="text-base font-psemibold text-gray-900">
                        {user.username}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
              {users.length === 0 ? (
                <Text className="text-sm text-gray-500">
                  No other accounts saved yet.
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>

      <ConfirmDialog
        visible={Boolean(pendingDelete)}
        title="Delete note"
        message={pendingDelete ? `Deleting "${pendingDelete.title}" will permanently remove it from your device.` : undefined}
        errorMessage={deleteError ?? undefined}
        confirmLabel="Delete"
        cancelLabel="Keep note"
        isDestructive
        isProcessing={isDeleting}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </SafeAreaView>
  );
};

export default NotesListScreen;
