export function extract_name_from_path(path) {
  if (path) {
    const segments = path.split("/");
    return segments[segments.length - 1];
  } else {
    return "";
  }
}

export function extract_extension(path) {
  if (path) {
    const segments = path.split(".");
    return segments[segments.length - 1];
  } else {
    return "";
  }
}
