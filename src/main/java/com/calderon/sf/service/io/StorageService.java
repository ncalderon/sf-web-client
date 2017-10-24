package com.calderon.sf.service.io;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {
    void init();

    void store(MultipartFile file);

    void store(MultipartFile file, String filename);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
    void delete(Path file);
    void deleteIfExist(Path file);
    Path createTemporaryFile(String prefix, String suffix, MultipartFile file);
}
