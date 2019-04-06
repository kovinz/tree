package ru.ifmo.tree.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.ifmo.tree.models.Folder;
import ru.ifmo.tree.repositories.FolderRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FolderController {

  private final Logger log = LoggerFactory.getLogger(FolderController.class);

  private final FolderRepository folderRepository;

  public FolderController(FolderRepository folderRepository) {
    this.folderRepository = folderRepository;
  }

  @GetMapping("/folders")
  public List<Folder> all() {
    List<Folder> folders = folderRepository.findAll();
    return folders.subList(1, folders.size());
  }

  @GetMapping("/folders/{id}")
  public ResponseEntity<?> one(@PathVariable Long id) {
    if (id == 1){
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Optional<Folder> folder = folderRepository.findById(id);
    return folder.map(response -> ResponseEntity.ok().body(response))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PutMapping("/folders")
  ResponseEntity<Folder> updateFolder(@Valid @RequestBody Folder folder) {
    log.info("Request to update folder: {}", folder);

    Optional<Folder> parent = folderRepository.findById(folder.parentId);
    if (!parent.isPresent())
      return ResponseEntity.notFound().build();
    folder.setParent(parent.get());

    Folder result = folderRepository.save(folder);
    return ResponseEntity.ok().body(result);
  }

  @DeleteMapping("/folders/{id}")
  public ResponseEntity<?> deleteFolder(@PathVariable Long id) {
    if (id == 1){
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    log.info("Request to delete folder: {}", id);
    folderRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/folders")
  ResponseEntity<Folder> createFolder(@Valid @RequestBody Folder folder) throws URISyntaxException {
    log.info("Request to create group: {}", folder);

    Optional<Folder> parent = folderRepository.findById(folder.parentId);
    if (!parent.isPresent())
      return ResponseEntity.notFound().build();
    folder.setParent(parent.get());

    Folder result = folderRepository.save(folder);
    return ResponseEntity.created(new URI("/api/group/" + result.getId()))
            .body(result);
  }

  @GetMapping("/folders/{id}/children")
  public List<Folder> getChildren(@PathVariable Long id) {
    return folderRepository.findAllByParentId(id);
  }
}
