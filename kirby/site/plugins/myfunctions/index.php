<?php
function getImage($image, $srcset) {
  return $image != null ? [
    'thumb' => $image -> resize(1) -> url(),
    'srcset' => $image -> srcset($srcset),
    'src' => $image -> resize(768) -> url(),
    'zoom' => $image -> resize(1920, null, 90) -> url(),
    'id' => $image -> id(),
    'ratio' => $image -> height() / $image -> width(),
    'alt' => $image -> alt() -> value(),
    'caption' => $image -> caption() -> kt() -> value()
  ] : null;
}

function getImages($images) {
  return array_values($images -> map(function ($item) {
    return getImage($item, [300, 768, 1440]);
  })->data());
}