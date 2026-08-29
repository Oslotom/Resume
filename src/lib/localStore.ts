import { CVData, CVVersion } from '../types';

const VERSIONS_KEY = 'cv_versions_local';

function loadAll(): CVVersion[] {
  try {
    const raw = localStorage.getItem(VERSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CVVersion[];
  } catch {
    return [];
  }
}

function saveAll(versions: CVVersion[]) {
  localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
}

export function listVersions(): CVVersion[] {
  return loadAll().sort((a, b) => {
    const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return tb - ta;
  });
}

export function saveVersion(userId: string, name: string, data: CVData): CVVersion {
  const versions = loadAll();
  const now = new Date().toISOString();
  const version: CVVersion = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    name,
    data: JSON.parse(JSON.stringify(data)),
    createdAt: now,
    updatedAt: now,
  };
  versions.push(version);
  saveAll(versions);
  return version;
}

export function updateVersion(versionId: string, name: string, data: CVData): CVVersion | null {
  const versions = loadAll();
  const idx = versions.findIndex((v) => v.id === versionId);
  if (idx === -1) return null;
  versions[idx] = {
    ...versions[idx],
    name,
    data: JSON.parse(JSON.stringify(data)),
    updatedAt: new Date().toISOString(),
  };
  saveAll(versions);
  return versions[idx];
}

export function deleteVersion(versionId: string): void {
  const versions = loadAll().filter((v) => v.id !== versionId);
  saveAll(versions);
}
