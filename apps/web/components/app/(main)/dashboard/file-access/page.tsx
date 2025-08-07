"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Upload,
  FileText,
  Video,
  ImageIcon,
  UserCheck,
  Trash2,
  Eye,
  Download,
  Grid3X3,
  List,
  Filter,
  Users,
  Clock,
  Share2,
} from "lucide-react";

interface FileItem {
  id: number;
  name: string;
  type: "image" | "document" | "video" | "other";
  size: string;
  uploadedOn: string;
  selected: boolean;
}

interface FileAccess {
  id: number;
  fileName: string;
  userEmail: string;
  grantedOn: string;
  grantedBy: string;
  permissions: string[];
  status: "active" | "expired" | "pending";
}

export default function FileAccessPage() {
  const [userEmail, setUserEmail] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [permissionType, setPermissionType] = useState("view");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState("all");

  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: "pospiech.png",
      type: "image",
      size: "1.504 MB",
      uploadedOn: "20.07.2025",
      selected: false,
    },
    {
      id: 2,
      name: "Oceny - Mikołaj Kowalski.png",
      type: "image",
      size: "369.3 KB",
      uploadedOn: "20.07.2025",
      selected: false,
    },
    {
      id: 3,
      name: "Cw13.webm",
      type: "video",
      size: "1.263 GB",
      uploadedOn: "16.07.2025",
      selected: false,
    },
    {
      id: 4,
      name: "CV Mikołaj Kowalski.pdf",
      type: "document",
      size: "176.1 KB",
      uploadedOn: "9.07.2025",
      selected: false,
    },
    {
      id: 5,
      name: "nextjs.pdf",
      type: "document",
      size: "2.1 MB",
      uploadedOn: "9.07.2025",
      selected: false,
    },
    {
      id: 6,
      name: "presentation.pptx",
      type: "document",
      size: "5.2 MB",
      uploadedOn: "8.07.2025",
      selected: false,
    },
  ]);

  const [fileAccesses, setFileAccesses] = useState<FileAccess[]>([
    {
      id: 1,
      fileName: "pospiech.png",
      userEmail: "user@example.com",
      grantedOn: "20.07.2025",
      grantedBy: "mikolaj@storage.com",
      permissions: ["view", "download"],
      status: "active",
    },
    {
      id: 2,
      fileName: "CV Mikołaj Kowalski.pdf",
      userEmail: "hr@company.com",
      grantedOn: "18.07.2025",
      grantedBy: "mikolaj@storage.com",
      permissions: ["view"],
      status: "active",
    },
    {
      id: 3,
      fileName: "presentation.pptx",
      userEmail: "team@company.com",
      grantedOn: "15.07.2025",
      grantedBy: "mikolaj@storage.com",
      permissions: ["view", "download"],
      status: "expired",
    },
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-6 h-6 text-blue-400" />;
      case "document":
        return <FileText className="w-6 h-6 text-red-400" />;
      case "video":
        return <Video className="w-6 h-6 text-green-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleFileSelect = (fileId: number) => {
    setFiles(
      files.map((file) =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );

    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  const handleGrantAccess = () => {
    if (userEmail && selectedFiles.length > 0) {
      const newAccesses = selectedFiles.map((fileId) => {
        const file = files.find((f) => f.id === fileId);
        return {
          id: fileAccesses.length + fileId,
          fileName: file?.name || "",
          userEmail: userEmail,
          grantedOn: new Date().toLocaleDateString("en-GB"),
          grantedBy: "mikolaj@storage.com",
          permissions:
            permissionType === "full"
              ? ["view", "download", "edit"]
              : permissionType === "download"
              ? ["view", "download"]
              : ["view"],
          status: "active" as const,
        };
      });

      setFileAccesses([...fileAccesses, ...newAccesses]);
      setUserEmail("");
      setSelectedFiles([]);
      setFiles(files.map((file) => ({ ...file, selected: false })));
    }
  };

  const handleRevokeAccess = (id: number) => {
    setFileAccesses(fileAccesses.filter((access) => access.id !== id));
  };

  const filteredFiles = files.filter((file) => {
    if (filterType === "all") return true;
    return file.type === filterType;
  });

  return (
    <div className=" bg-black text-white">
      {/* Main Content */}
      <div className="">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold">File Access Control</h1>
              <p className="text-sm text-muted-foreground">
                Manage file permissions and user access
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-brand text-black" : ""}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-brand text-black" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Button className="bg-transparent border border-gray-800 rounded-lg px-6 hover:bg-gray-800">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex h-[calc(100vh-120px)]">
          {/* Left Panel - File Browser */}
          <div className="flex-1 p-6 border-r border-gray-800">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold">Files</h2>
                  <Badge
                    variant="secondary"
                    className="bg-brand/20 text-brand border-brand/30"
                  >
                    {selectedFiles.length} Selected
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search files..."
                      className="pl-10 bg-gray-900 border-0 w-64"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32 bg-gray-900 border-0">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="all">All Files</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <Card
                      key={file.id}
                      className={`bg-gray-900/50 border-gray-800 cursor-pointer transition-all hover:bg-gray-800/50 ${
                        file.selected ? "ring-2 ring-brand border-brand" : ""
                      }`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      <CardContent className="p-4">
                        <div className="relative mb-3">
                          <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                            <div className="text-4xl">
                              {file.type === "image" && (
                                <ImageIcon className="w-12 h-12 text-blue-400" />
                              )}
                              {file.type === "document" && (
                                <FileText className="w-12 h-12 text-red-400" />
                              )}
                              {file.type === "video" && (
                                <Video className="w-12 h-12 text-green-400" />
                              )}
                              {file.type === "other" && (
                                <FileText className="w-12 h-12 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <Checkbox
                            checked={file.selected}
                            className="absolute top-2 right-2 border-gray-600 bg-black/50"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm truncate mb-1">
                            {file.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {file.size}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <Card
                      key={file.id}
                      className={`bg-gray-900/50 border-gray-800 cursor-pointer transition-all hover:bg-gray-800/50 ${
                        file.selected ? "ring-2 ring-brand border-brand" : ""
                      }`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={file.selected}
                            className="border-gray-600"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">
                              {file.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {file.size} • {file.uploadedOn}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Permission Management */}
          <div className="w-96 bg-gray-900/30">
            <Tabs defaultValue="grant" className="h-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 m-4 mb-0">
                <TabsTrigger
                  value="grant"
                  className="data-[state=active]:bg-brand data-[state=active]:text-black"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Grant Access
                </TabsTrigger>
                <TabsTrigger
                  value="manage"
                  className="data-[state=active]:bg-brand data-[state=active]:text-black"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grant" className="p-4 space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Grant File Access</CardTitle>
                    <CardDescription>
                      {selectedFiles.length > 0
                        ? `Grant access to ${
                            selectedFiles.length
                          } selected file${selectedFiles.length > 1 ? "s" : ""}`
                        : "Select files to grant access"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label
                        htmlFor="userEmail"
                        className="text-sm font-medium"
                      >
                        User Email
                      </Label>
                      <Input
                        id="userEmail"
                        type="email"
                        placeholder="user@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-gray-800 border-0 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Permission Level
                      </Label>
                      <Select
                        value={permissionType}
                        onValueChange={setPermissionType}
                      >
                        <SelectTrigger className="bg-gray-800 border-0 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800">
                          <SelectItem value="view">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Only
                            </div>
                          </SelectItem>
                          <SelectItem value="download">
                            <div className="flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              View & Download
                            </div>
                          </SelectItem>
                          <SelectItem value="full">
                            <div className="flex items-center gap-2">
                              <Share2 className="w-4 h-4" />
                              Full Access
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleGrantAccess}
                      className="w-full bg-brand hover:bg-brand/90 text-black font-medium"
                      disabled={!userEmail || selectedFiles.length === 0}
                    >
                      Grant Access
                    </Button>
                  </CardContent>
                </Card>

                {selectedFiles.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Selected Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedFiles.map((fileId) => {
                          const file = files.find((f) => f.id === fileId);
                          return file ? (
                            <div
                              key={fileId}
                              className="flex items-center gap-2 text-sm"
                            >
                              {getFileIcon(file.type)}
                              <span className="truncate">{file.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="manage" className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Active Permissions
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-brand/20 text-brand border-brand/30"
                    >
                      {fileAccesses.filter((a) => a.status === "active").length}{" "}
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {fileAccesses.map((access) => (
                      <Card
                        key={access.id}
                        className="bg-gray-900 border-gray-800"
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate text-sm">
                                  {access.fileName}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {access.userEmail}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getStatusColor(
                                  access.status
                                )}`}
                              >
                                {access.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              {access.permissions.map((permission) => (
                                <Badge
                                  key={permission}
                                  variant="secondary"
                                  className="text-xs bg-gray-800"
                                >
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {access.grantedOn}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevokeAccess(access.id)}
                                className="text-destructive hover:bg-destructive/10 h-6 px-2"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
