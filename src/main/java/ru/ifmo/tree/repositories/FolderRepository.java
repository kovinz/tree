package ru.ifmo.tree.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.ifmo.tree.models.Folder;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel = "folders", path = "folders")
public interface FolderRepository extends JpaRepository<Folder, Long> {
  List<Folder> findAllByParentId(long id);
}
