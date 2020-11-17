<?php

kirby()->response()->header('Access-Control-Allow-Origin','*');
kirby()->response()->header('Access-Control-Allow-Credentials', 'true');
kirby()->response()->header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
kirby()->response()->header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
kirby()->response()->header('Content-type', 'application/json; charset=utf-8');
  
$data = [
  'title' => $page->title()->value(),
  'text' => $page -> text() -> value(),
  'site' => [
    'codes' => array_values(page('home') -> codes() -> toStructure() -> map(function($code){
      return [
        'code' => $code -> passcode() -> value(),
        'filelink' => $code -> filelink() -> value()
      ];
    }) -> data()),
    'children' => array_values($site->children()->published()->map(function ($child) {
      return [
        'id' => $child->id(),
        'title' => $child->title()->value(),
        'template' => $child->intendedTemplate()->name(),
        'isListed' => $child->isListed(),
        'children' => array_values($child->children()->published()->map(function ($grandChild) {
          return [
            'id' => $grandChild->id(),
            'template' => $grandChild->intendedTemplate()->name()
          ];
        })->data())
      ];
    })->data())
  ]
];

echo json_encode($data);