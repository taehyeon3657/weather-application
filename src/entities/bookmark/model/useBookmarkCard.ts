import { useState } from 'react';
import { useCurrentWeatherQuery } from '@/entities/weather/model/weather.query';
import { useBookmarkStore } from './bookmark.store';
import { BookmarkLocation } from './types';
import { useRouter } from 'next/navigation';

export function useBookmarkCard(location: BookmarkLocation) {
  const router = useRouter();
  const { removeBookmark, updateAlias } = useBookmarkStore();

  const [isEditing, setIsEditing] = useState(false);
  const [aliasInput, setAliasInput] = useState(location.alias || location.name);

  const { data: weather, isLoading } = useCurrentWeatherQuery(location.lat, location.lon);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCardClick = () => {
    if (isEditing) return;

    router.push(
      `/location/${location.lat}/${location.lon}?name=${encodeURIComponent(location.alias || location.name)}`
    );
  };

  const handleSave = () => {
    if (aliasInput.trim()) {
      updateAlias(location.lat, location.lon, aliasInput);
    } else {
      setAliasInput(location.alias || location.name);
    }
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBookmark(location.lat, location.lon);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAliasInput(e.target.value);
  };

  return {
    isEditing,
    aliasInput,
    weather,
    isLoading,
    handlers: {
      handleStartEdit,
      handleCardClick,
      handleSave,
      handleDelete,
      handleKeyDown,
      handleChangeInput,
    },
  };
}
