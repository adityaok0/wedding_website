export type GuestGreeting = {
  name?: string;
};

function sanitizeGuestName(name: string | undefined) {
  const cleanName = name?.replace(/\s+/g, " ").trim();

  if (!cleanName) {
    return undefined;
  }

  return cleanName.slice(0, 80);
}

function decodeBase64UrlName(encodedName: string | string[] | undefined) {
  const rawName = Array.isArray(encodedName) ? encodedName[0] : encodedName;
  const normalizedName = rawName?.trim();

  if (!normalizedName || !/^[A-Za-z0-9+/_-]+={0,2}$/.test(normalizedName)) {
    return undefined;
  }

  try {
    const base64 = normalizedName.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decodedName = Buffer.from(paddedBase64, "base64").toString("utf8");

    return sanitizeGuestName(decodedName);
  } catch {
    return undefined;
  }
}

export function getGuestGreeting(encodedName: string | string[] | undefined): GuestGreeting {
  return {
    name: decodeBase64UrlName(encodedName),
  };
}
